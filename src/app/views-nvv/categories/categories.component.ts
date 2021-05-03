import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
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

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category = new Category(0, "");

  indexMouseMove: number = 0;

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog, // внедряем MatDialog, чтобы работать с диалоговыми окнами
  ) { }

  ngOnInit(): void {
    // this.categories = this.dataHandler.getCategories();
    // this.dataHandler.categoriesSubject.subscribe(catigories => this.categories = catigories);
    // this.dataHandler.getAllCategories().subscribe(catigories => this.categories = catigories); инициатором получения данных стал app.component
  }

  onShowTasksByCategory(category: Category): void {
    //this.dataHandler.getTasksByCategory(category);
    // this.dataHandler.fillTasksByCategory(category);

    if (this.selectedCategory === category) { return; } // лишний раз не делать запрос данных

    this.selectedCategory = category; // сохраняем выбраную категорию

    this.selectCategory.emit(this.selectedCategory); // вызываем внешний обработчик и передаем туда выбраную категорию
  }
  onShowAllTasksCategories(): void {
    this.selectedCategory.id = 0;
    this.selectedCategory.title = '';
    this.selectCategory.emit(this.selectedCategory);
  }
  onShowEditIcon(index: number): void {
    this.indexMouseMove = index;
  }
  onOpenEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редагування категорії'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') { // нажали удалить

        this.deleteCategory.emit(category); // вызываем внешний обработчик

        return;
      }

      if (result as string) { // нажали сохранить
        category.title = result as string;

        this.updateCategory.emit(category); // вызываем внешний обработчик
        return;
      }
    });
  }

}
