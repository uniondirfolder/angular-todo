import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterStateTask } from '../data-nvv/dao/enum/FilterStateTasks';
import { NoValue } from '../data-nvv/dao/enum/NoValue';
import { CategoryDAOArray } from '../data-nvv/dao/impl/CategoryDAOArray';
import { PriorityDAOArray } from '../data-nvv/dao/impl/PriorityDAOArray';
import { TaskDAOArray } from '../data-nvv/dao/impl/TaskDAOArray';
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

  constructor(private http: HttpClient) {
    //this.fillTasks();
  }


  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }
  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }
  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }
  deleteTask(task: Task): Observable<Task> {
    return this.taskDaoArray.delete(task);
  }
  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }
  // поиск задач по параметрам
  searchTasks(category: Category | NoValue, searchText: string | NoValue, status: boolean | FilterStateTask, priority: Priority | NoValue): Observable<Task[]> {

    return this.taskDaoArray.search(category, searchText, status, priority);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.delete(category);
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.add(category);
  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDaoArray.search(title);
  }

  // stat

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(new Category(0, ''));
  }

  getUncompletedCountInCategory(category: Category | undefined): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

  getTotalCount(): Observable<number> {
    return this.taskDaoArray.getTotalCount();
  }

  // приоритеты

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.add(priority);
  }

  deletePriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.delete(priority);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.update(priority);
  }
}
