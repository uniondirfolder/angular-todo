import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FilterStateTask } from './data-nvv/dao/enum/FilterStateTasks';
import { NoValue } from './data-nvv/dao/enum/NoValue';
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
  categories: Category[] = []; // all categories
  priorities: Priority[] = []; // all priorities
  selectedCategory: Category = new Category(0, '');

  // пошук
  searchTaskText = ''; // поточне значення для пошуку завдань

  // фільтрація
  statusFilter: FilterStateTask = FilterStateTask.All;
  priorityFilter: Priority = new Priority(0, '', '');

  constructor(
    private dataHandler: DataHandlerService, // фасад для работы с данными
    public http: HttpClient
  ) { }

  ngOnInit(): void {
    //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);

    this.onSelectCategory(NoValue.Yes);
  }

  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // зміна категорії
  onSelectCategory(category: Category | NoValue) {

    if (category != NoValue.Yes) { this.selectedCategory = category }
    this.updateTasks();
  }

  // видалення категорії
  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category).subscribe(cat => {
      this.selectedCategory.id = 0; // відкриваємо категорію "Все"
      this.selectedCategory.title = '';
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // оновлення категорії
  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // оновлення завдання
  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasks()
    });
    /* this.dataHandler.updateTask(task).subscribe(// for easy mind - not good practice
      () => {
        //console.log(task.category)
        if (task.category) { this.selectedCategory = task.category } // all bad... not shure
        this.dataHandler.searchTasks(
          this.selectedCategory, NoValue.Yes, FilterStateTask.All, NoValue.Yes).subscribe(tasks => {
            this.tasks = tasks;
          });
      }); */
  }

  // видалення завдання
  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task).subscribe(cat => {
      this.updateTasks()
    });
    /* this.dataHandler.deleteTask(task).subscribe(// for easy mind - not good practice
      () => {
        //console.log(task.category)
        if (task.category) { this.selectedCategory = task.category } // all bad... not shure
        this.dataHandler.searchTasks(
          this.selectedCategory, NoValue.Yes, FilterStateTask.All, NoValue.Yes).subscribe(tasks => {
            this.tasks = tasks;
          });
      }); */
  }

  // пошук завдань
  onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фільтрація завдань по статусу (все, вирішені, невирішені)
  onFilterTasksByStatus(status: FilterStateTask) {

    this.statusFilter = status;
    this.updateTasks();
  }

  // фільтрація завдань по статусу (все, вирішені, невирішені)
  onFilterTasksByPriority(priority: Priority){
    console.log(priority)
    this.priorityFilter = priority;
    this.updateTasks();
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
