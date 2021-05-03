import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model-nvv/Category';
import { DataHandlerService } from 'src/app/service-nvv/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories: Category[] = [];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category = new Category(0, "");

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    // this.categories = this.dataHandler.getCategories();
    // this.dataHandler.categoriesSubject.subscribe(catigories => this.categories = catigories);
    // this.dataHandler.getAllCategories().subscribe(catigories => this.categories = catigories); инициатором получения данных стал app.component
  }




  showTasksByCategory(category: Category): void {
    //this.dataHandler.getTasksByCategory(category);
    // this.dataHandler.fillTasksByCategory(category);

    if (this.selectedCategory === category) { return; } // лишний раз не делать запрос данных

    this.selectedCategory = category; // сохраняем выбраную категорию

    this.selectCategory.emit(this.selectedCategory); // вызываем внешний обработчик и передаем туда выбраную категорию
  }
  showAllTasksCategories(): void{
    this.selectedCategory = new Category(0, "");
    this.selectCategory.emit(this.selectedCategory);
  }
}
