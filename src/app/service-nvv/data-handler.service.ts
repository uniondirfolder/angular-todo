import { Injectable } from '@angular/core';
import { TestData } from '../data-nvv/TestData';
import { Category } from '../model-nvv/Category';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  getCategories(): Category[]{
    return TestData.categories;
  }
}
