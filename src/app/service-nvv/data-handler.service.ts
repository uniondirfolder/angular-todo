import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TestData } from '../data-nvv/TestData';
import { Category } from '../model-nvv/Category';
import { Task } from '../model-nvv/Task';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() {
    this.fillTasks();
  }

  /*  getCategories(): Category[] {
     return TestData.categories;
   }
   getTasks(): Task[] {
     return TestData.tasks;
   }
   getTasksByCategory(category: Category): Task[] {
     const tasks = TestData.tasks.filter(task => task.category === category);
     return tasks;
   } */

  //rxjs (Subject -> BehaviorSubject) must init value
  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  fillTasks() {
    this.taskSubject.next(TestData.tasks)
  }

  fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    this.taskSubject.next(tasks);
  }

}
