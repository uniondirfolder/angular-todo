import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryDAOArray } from '../data-nvv/dao/impl/CategoryDAOArray';
import { PriorityDAOArray } from '../data-nvv/dao/impl/PriorityDAOArray';
import { TaskDAOArray } from '../data-nvv/dao/impl/TAskDAOArray';
import { TestData } from '../data-nvv/TestData';
import { Category } from '../model-nvv/Category';
import { Priority } from '../model-nvv/Priority';
import { Task } from '../model-nvv/Task';


// класс релизовует методы, которые нужны frontend'у 
// напоминает паттерн Фасад - выдает только то, что нужно для функционала
// сервис не реализовывает напрямую интерфейсы DAO, а использует их реализацию
// используется только те методі которіе необходимі

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDAOArray();
  private categoryDaoArray = new CategoryDAOArray();
  private priorityDaoArray = new PriorityDAOArray();

  constructor() {
    //this.fillTasks();
  }

  /*  getCategories(): Category[] { //part 1
     return TestData.categories;
   }
   getTasks(): Task[] {
     return TestData.tasks;
   }
   getTasksByCategory(category: Category): Task[] {
     const tasks = TestData.tasks.filter(task => task.category === category);
     return tasks;
   } */

  /* //rxjs (Subject -> BehaviorSubject) must init value part 2
  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  fillTasks() {
    this.taskSubject.next(TestData.tasks)
  }

  fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.taskSubject.next(tasks);
  } */

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }
  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }
  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }
  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }
  deleteTask(task: Task): Observable<Task> {
    return this.taskDaoArray.delete(task);
  }
  // поиск задач по параметрам
  searchTasks(category: Category | boolean, searchText: string | boolean, status: boolean | string, priority: Priority | boolean): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.delete(category);
  }
}
