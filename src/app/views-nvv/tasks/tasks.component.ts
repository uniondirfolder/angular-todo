import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { Task } from 'src/app/model-nvv/Task';
import { DataHandlerService } from 'src/app/service-nvv/data-handler.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  //  поля для таблиці (ті, що відібражають дані з справи - повинні співпадати з назвами зміних класу)
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];

  // обов*язковий елемент, любе джерело даних (БД, масиви, JSON ...)
  dataSource: MatTableDataSource<Task> = new MatTableDataSource(); // контейнер - джерело даних таблиці

  // Посилання на компоненти таблиці
  @ViewChild('matPaginator', { static: false })
  private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private sort!: MatSort;

  tasks: Task[] = [];
  // Текущие задачи для отображения на странице
  @Input('tasks')
  set setTasks(tasks: Task[]) {// на прямую не присваиваем значение только через инпут
    this.tasks = tasks;
    this.fillTable();
  }
  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  constructor(
    //private dataHandler: DataHandlerService, // доступ к данным
    private dialog: MatDialog, // для открытия нового д/а (из текущего) - подтверждения crud
  ) {
  }

  ngOnInit(): void {
    // this.tasks = this.dataHandler.getTasks();
    // this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    this.dataSource = new MatTableDataSource();
    this.fillTable(); // заполняем таблицы данными (задачи) и всеми метаданными
  }

  ngAfterViewInit(): void { // взагалом усе проініціалізовано, тому можемо робити операції зі зміними (or undefined)
    this.addTableObjects();
  }

  // демонструє справи з застосуванням усіх поточних вимог (категорія, пошук, фільтри і т.інш)
  private fillTable(): void {
    if (!this.dataSource) { return; }

    this.dataSource.data = this.tasks; // оновити джерело даних (дані масиву task оновилися)

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName) => { // реализация

      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : '';
        }

        case 'category': {
          return task.category ? task.category.title : '';
        }

        case 'date': {
          return task.date ? task.date.toString() : '';
        }

        case 'title': {
          return task.title;
        }
      }
      return '';
    };
  }

  private toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task): string {
    // колір закритої справи
    if (task.completed) {
      return '#F8F9FA'; // TODO винести кольора до констант (magic string...)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff'; // TODO винести кольора до констант (magic string...)
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент сортування даних (за потреби)
    this.dataSource.paginator = this.paginator; // оновити компонент поділу на сторінки
  }

  /* onClickTask(task: Task): void{
    this.updateTask.emit(task);
  } */

  // диалоговое окно редактирования - для добавления задачи
  openEditTaskDialog(task: Task): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, { data: [task, 'Редагування завдання'], autoFocus: false });

    dialogRef.afterClosed().subscribe(result => {
      //  обработка результатов
      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) {// if press OK and income Task
        this.updateTask.emit(task);
        return;
      }
    });
  }
  // диалоговое окно подтверждения удаления
  // tslint:disable-next-line:typedef
  onOpenDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: '500px', data: {
          dialogTitle: 'Підтвердіть дію',
          message: `Ви дійсно бажаєте видалити завдання: "${task.title}"?`
        },
        autoFocus: false
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    });
  }

  onOpenEditDialog(task: Task): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редагування завдання'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
      }
      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  onToggleStatus(task: Task): void {
    this.toggleTaskCompleted(task);
    this.updateTask.emit(task);
  }
}
