import { Injectable } from '@angular/core';
import { TestData } from '../data-nvv/TestData';
import { Category } from '../model-nvv/Category';
import { Task } from '../model-nvv/Task';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  getCategories(): Category[] {
    return TestData.categories;
  }
  getTasks(): Task[] {
    return TestData.tasks;
  }
  getTasksByCategory(category: Category): Task[] {
    const tasks = TestData.tasks.filter(task => task.category === category);
    return tasks;
  }
}
