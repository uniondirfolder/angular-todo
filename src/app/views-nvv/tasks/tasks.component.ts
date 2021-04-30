import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/model-nvv/Task';
import { DataHandlerService } from 'src/app/service-nvv/data-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  //  поля для таблиці (ті, що відібражають дані з справи - повинні співпадати з назвами зміних класу)
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  // обов*язковий елемент, любе джерело даних (БД, масиви, JSON ...)
  dataSource: MatTableDataSource<Task> = new MatTableDataSource(); // контейнер - джерело даних таблиці

  tasks: Task[] = [];


  constructor(private dataHandler: DataHandlerService) {
  }
  ngOnInit(): void {
    // this.tasks = this.dataHandler.getTasks();
    this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);

    this.refreshTable();
  }

  // демонструє справи з застосуванням усіх поточних вимог (категорія, пошук, фільтри і т.інш)
  refreshTable() {
    this.dataSource.data = this.tasks; // оновити джерело даних (дані масиву task оновилися)
  }

  toggleTaskCompleted(task: Task): void {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task): string {
    // колір закритої справи
    if(task.completed){
      return '#F8F9FA'; // TODO винести кольора до констант (magic string...)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff'; // TODO винести кольора до констант (magic string...)
  }
}
