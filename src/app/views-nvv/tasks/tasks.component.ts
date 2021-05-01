import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/model-nvv/Task';
import { DataHandlerService } from 'src/app/service-nvv/data-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  //  поля для таблиці (ті, що відібражають дані з справи - повинні співпадати з назвами зміних класу)
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];

  // обов*язковий елемент, любе джерело даних (БД, масиви, JSON ...)
  dataSource: MatTableDataSource<Task> = new MatTableDataSource(); // контейнер - джерело даних таблиці

  // Посилання на компоненти таблиці
  @ViewChild('matPaginator', { static: false })
  private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false })
  private sort!: MatSort;

  tasks: Task[] = [];


  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // this.tasks = this.dataHandler.getTasks();
    this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);

    //this.dataSource=new MatTableDataSource();

    this.refreshTable();
  }

  ngAfterViewInit(): void { // взагалом усе проініціалізовано, тому можемо робити операції зі зміними (or undefined)
    this.addTableObjects();
  }

  // демонструє справи з застосуванням усіх поточних вимог (категорія, пошук, фільтри і т.інш)
  refreshTable() {
    this.dataSource.data = this.tasks; // оновити джерело даних (дані масиву task оновилися)

    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (task, colName) => { // реализация

      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : "";
        }
        
        case 'category': {
          return task.category ? task.category.title : "";
        }
        
        case 'date': {
          return task.date ? task.date.toString() : "";
        }
        
        case 'title': {
          return task.title;
        }
      }
      return "";
    }
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


  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент сортування даних (за потреби)
    this.dataSource.paginator = this.paginator; // оновити компонент поділу на сторінки
  }
}
