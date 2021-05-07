import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FilterStateTask } from 'src/app/data-nvv/dao/enum/FilterStateTasks';
import { OperType } from 'src/app/data-nvv/dao/enum/OperType';
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { Category } from 'src/app/model-nvv/Category';
import { Priority } from 'src/app/model-nvv/Priority';
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
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  tasks: Task[] = []; // Текущие задачи для отображения на странице
  priorities: Priority[] = []; // список пріоритетів (потрб для фільтрації завдань)

  @Input('tasks')
  set setTasks(tasks: Task[]) {// на прямую не присваиваем значение только через инпут
    this.tasks = tasks;
    this.fillTable();
  }
  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>(); // клацнули на категорію з списку завдань

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<FilterStateTask>();

  @Output()
  filterByPriority = new EventEmitter<Priority>();

  @Output()
  addTask = new EventEmitter<Task>();

  // пошук
  searchTaskText: string = ''; // текущее значение для поиска задач
  selectedStatusFilter: FilterStateTask = FilterStateTask.All;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  selectedPriorityFilter: Priority = new Priority(0, '', '');

  @Input()
  selectedCategory: Category = new Category(0, '');

  @Input()
  filter: string = '';
  @Input()
  filterViewPriority: string = '';

  isMobile: boolean = false;

  constructor(
    private dialog: MatDialog, // для открытия нового д/а (из текущего) - подтверждения crud
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile()
  }

  ngOnInit(): void {
    // this.tasks = this.dataHandler.getTasks();
    // this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    this.dataSource = new MatTableDataSource();
    //this.fillTable(); // заполняем таблицы данными (задачи) и всеми метаданными
    this.onSelectCategory(new Category(0, ''));
  }

  ngAfterViewInit(): void { // взагалом усе проініціалізовано, тому можемо робити операції зі зміними (or undefined)
    this.addTableObjects();
  }

  // демонструє справи з застосуванням усіх поточних вимог (категорія, пошук, фільтри і т.інш)
  fillTable(): void {
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

  toggleTaskCompleted(task: Task): void {
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

  addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент сортування даних (за потреби)
    this.dataSource.paginator = this.paginator; // оновити компонент поділу на сторінки
  }

  /* onClickTask(task: Task): void{
    this.updateTask.emit(task);
  } */

  // диалоговое окно редактирования - для добавления задачи
  openEditTaskDialog(task: Task): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, { data: [task, 'Редагування завдання', OperType.EDIT], autoFocus: false });

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

  // диалоговое окно для добавления задачи
  openAddTaskDialog() {
    // то же самое, что и при редактировании, но только передаем пустой объект Task
    const task = new Task(0, '', false, undefined, this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, { data: [task, 'Нове завдання', OperType.ADD] });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК и есть результат
        this.addTask.emit(task);
      }
    });
  }

  // диалоговое окно подтверждения удаления
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

  onSelectCategory(category: Category): void {
    this.selectCategory.emit(category);
  }

  // фільтрація за назвою
  onFilterByTitle(): void {
    this.filterByTitle.emit(this.searchTaskText);
  }

  // фільтрація за статусом
  onFilterByStatus(value: any): void {

    if (typeof (value) === 'string') { this.selectedStatusFilter = FilterStateTask.All; }
    if (typeof (value) === 'boolean') {
      const chose = <Boolean>value;
      if (chose) { this.selectedStatusFilter = FilterStateTask.Solved; }
      else { this.selectedStatusFilter = FilterStateTask.Unsolved; }
    }
    // на всякий випадок перевіряємо чи змінилося значення (хоча сам UI компонент повинен це робити)
    // if (value !== this.selectedStatusFilter) {
    //   // this.selectedStatusFilter = value;

    // }
    if (this.selectedStatusFilter == FilterStateTask.All) { this.filter = ''; }
    this.filterByStatus.emit(this.selectedStatusFilter);
  }
  // filtering by priority
  onFilterByPriority(value: any): void {

    if (value === this.selectedPriorityFilter) return;
    else if (value === 'null') { this.selectedPriorityFilter = new Priority(0, '', ''); this.filterViewPriority = ''; }
    else {
      this.selectedPriorityFilter = value;
    }
    console.log(this.selectedPriorityFilter)
    this.filterByPriority.emit(this.selectedPriorityFilter);
  }

  // в зависимости от статуса задачи - вернуть фоноввый цвет
  getMobilePriorityBgColor(task: Task): string {

    if (task.priority != null && !task.completed) {
      return task.priority.color;
    }

    return 'none';
  }
  

}


