import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from './model-nvv/Category';
import { Priority } from './model-nvv/Priority';
import { Task } from './model-nvv/Task';
import { DataHandlerService } from './service-nvv/data-handler.service';
// import { TodoTask } from './models/todoTask';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  tasks: Task[] = [];
  categories: Category[] = [];
  private selectedCategory: Category = new Category(0, "");

  constructor(
    private dataHandler: DataHandlerService, // фасад для работы с данными
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;

    this.dataHandler.searchTasks(this.selectedCategory, false, "false", false)
      .subscribe((tasks: Task[]) => { this.tasks = this.tasks });
  }
  onUpdateTask(task: Task) {
    console.log(task);
  }
  sendRequest() {
    this.http.get('', { params: {} }).subscribe(result => console.log(result))
  }





  // todoItems: TodoTask[] = [];

  // appAddTask = (event: TodoTask) => {
  //   // console.log(event.toString())
  //   this.todoItems.push(event);
  // }


}
