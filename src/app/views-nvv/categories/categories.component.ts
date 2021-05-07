import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OperType } from 'src/app/data-nvv/dao/enum/OperType';
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

  @Input()
  selectedCategory: Category = new Category(0, "");

  // категории с кол-вом активных задач для каждой из них
  @Input('categoryMap')
  set setCategoryMap(categoryMap: Map<Category, number>) {
    this.selectedCategoryMap = categoryMap;
  }

  @Input()
  uncompletedTotal: number= -1;

  // обрали категорію з списку
  @Output()
  selectCategory = new EventEmitter<Category>();

  // видалили категорію
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // змінили категорію
  @Output()
  updateCategory = new EventEmitter<Category>();

  // додали категорію
  @Output()
  addCategory = new EventEmitter<string>(); // передаємо тільки назву нової категорії

  // пошук категорії
  @Output()
  searchCategory = new EventEmitter<string>(); // передаємо строку для пошуку

  indexMouseMove: number = 0; // для відображення іконки редагування при наведенні на категорію
  searchCategoryTitle: string = ''; // поточне значення для пошуку категорій
  selectedCategoryMap: Map<Category, number> = new Map<Category, number>(); // список всех категорий и кол-во активных задач

  isMobile: boolean = false;
  isTablet: boolean = false;
  constructor(
    //private dataHandler: DataHandlerService,
    private dialog: MatDialog, // впроваджуємо MatDialog, щоб працювати з діалоговими вікнами
    private deviceService: DeviceDetectorService
  ) { 
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();
  }

  ngOnInit(): void {
    // this.categories = this.dataHandler.getCategories();
    // this.dataHandler.categoriesSubject.subscribe(catigories => this.categories = catigories);
    // this.dataHandler.getAllCategories().subscribe(catigories => this.categories = catigories); ініціатором отримання даних став app.component
  }

  onShowTasksByCategory(category: Category): void {
    //this.dataHandler.getTasksByCategory(category);
    // this.dataHandler.fillTasksByCategory(category);

    if (this.selectedCategory === category) { return; } // зайвий раз не робити запит даних

    this.selectedCategory = category; // зберігаємо обрану категорію

    this.selectCategory.emit(this.selectedCategory); // викликаємо зовнішній обробник і передаємо туди обрану категорію
  }
  onShowAllTasksCategories(): void {
    this.selectedCategory.id = 0;
    this.selectCategory.emit(this.selectedCategory);
  }
  onShowEditIcon(index: number): void {
    this.indexMouseMove = index;
  }

  // діалогове вікно для редагування категорії
  onOpenEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редагування категорії', OperType.EDIT],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') { // натиснули видалити
        this.deleteCategory.emit(category); // викликаємо зовнішній обробник
        return;
      }

      if (result as string) { // натиснули зберегти
        category.title = result as string;
        this.updateCategory.emit(category); // викликаємо зовнішній обробник
        return;
      }
    });
  }

  // діалогове вікно для додавання категорії
  openAddDialog(): void {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Нова категорія', OperType.ADD],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string); // викликаємо зовнішній обробник
      }
    });
  }

  // пошук категорії
  search(): void {
    // if (this.searchCategoryTitle === '') {
    //   return;
    // }
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
