import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model-nvv/Category';
import { DataHandlerService } from 'src/app/service-nvv/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.categories = this.dataHandler.getCategories();
  }

  categories: Category[] = [];

  showTasksByCategory(category: Category) {
    this.dataHandler.getTasksByCategory(category);
  }
}
