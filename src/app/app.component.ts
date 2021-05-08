
import { Component, Input, OnInit, TRANSLATIONS } from '@angular/core';
import { Category } from './model-nvv/Category';
import { Priority } from './model-nvv/Priority';
import { Task } from './model-nvv/Task';
import { Observable } from "rxjs";
import { IntroService } from './service-nvv/intro.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Stat } from './model-nvv/Stat';
import { CategoryService } from './data-nvv/dao/impl/category.service';
import { TaskService } from './data-nvv/dao/impl/task.service';
import { PriorityService } from './data-nvv/dao/impl/priority.service';
import { StatService } from './data-nvv/dao/impl/stat.service';
import { MatDialog } from '@angular/material/dialog';
import { CategorySearchValues, TaskSearchValues } from './data-nvv/dao/interface/SearchObjects';
import { DashboardData } from './object/DashboardData';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';

  // если равно null - по-умолчанию будет выбираться категория 'Все'
  selectedCategory: Category = new Category(0,'');

  tasks: Task[] = []; // текущие задачи для отображения на странице
  priorities: Priority[] = []; // приоритеты для отображения
  categories: Category[] = []; // категории для отображения и фильтрации

  // тип устройства
  isMobile: boolean;
  isTablet: boolean;

  showStat = true;   // показать/скрыть статистику
  showSearch = true;  // показать/скрыть поиск

  //@ts-ignore
  stat: Stat; // данные общей статистики
  dash: DashboardData = new DashboardData(); // данные для дашбоарда


  // параметры бокового меню с категориями
  menuOpened: boolean = false; // открыть-закрыть
  menuMode: any; // тип выдвижения (поверх, с толканием и пр.)
  menuPosition: any;
  showBackdrop: boolean = false;

  readonly defaultPageSize = 5;
  readonly defaultPageNumber = 0;

  uncompletedCountForCategoryAll: number = 0; // для категории Все


  totalTasksFounded: number = 0; // сколько всего найдено данных

  // параметры поисков
  taskSearchValues = new TaskSearchValues(); // экземпляр создаем позже, когда подгрузим данные из cookies
  categorySearchValues = new CategorySearchValues(); // экземпляр можно создать тут же, т.к. не загружаем из cookies



  constructor(
    // сервисы для работы с данными (фасад)
    private taskService: TaskService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private statService: StatService,
    private dialog: MatDialog, // работа с диалог. окнами
    private introService: IntroService, // вводная справоч. информация с выделением областей
    private deviceService: DeviceDetectorService // для определения типа устройства (моб., десктоп, планшет)
  ) {

    // не рекомендуется вкладывать subscribe друг в друга,
    // но чтобы не усложнять код цепочками rxjs - попроще 

    this.statService.getOverallStat().subscribe((result => {     // сначала получаем данные статистики
      this.stat = result;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      // заполнить категории
      //@ts-ignore
      this.fillAllCategories().subscribe(res => {
        this.categories = res;


        // первоначальное отображение задач при загрузке приложения
        // запускаем толко после выполнения статистики (т.к. понадобятся ее данные) и загруженных категорий
        this.selectCategory(this.selectedCategory);

      });


    }));


    // определяем тип устройства
    this.isMobile = deviceService.isMobile();
    this.isTablet = deviceService.isTablet();


    this.setMenuDisplayParams(); // параметры отображения меню (зависит от устройства пользователя)

  }

  ngOnInit(): void {

    // заполнить приоритеты
    this.fillAllPriorities();


    // для мобильных и планшетов - не показывать интро
    if (!this.isMobile && !this.isTablet) {
      // this.introService.startIntroJS(true); // при первом запуске приложения - показать интро
    }


  }

  // заполняет массив приоритетов
  fillAllPriorities() {

    this.priorityService.findAll().subscribe(result => {
      this.priorities = result;
    });


  }

  // заполняет массив категорий
  fillAllCategories(): Observable<Category[]> {

    return this.categoryService.findAll();


  }

  // заполнить дэш конкретными значниями
  fillDashData(completedCount: number, uncompletedCount: number) {
    this.dash.completedTotal = completedCount;
    this.dash.uncompletedTotal = uncompletedCount;
  }


  // выбрали/изменили категорию
  selectCategory(category: Category) {

    if (category) { // если это не категория Все - то заполняем дэш данными выбранной категории
      this.fillDashData(category.completedCount, category.uncompletedCount);
    } else {
      this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal); // заполняем дэш данными для категории Все
    }

    // сбрасываем, чтобы показывать результат с первой страницы
    this.taskSearchValues.pageNumber = 0;

    this.selectedCategory = category; // запоминаем выбранную категорию

    // для поиска задач по данной категории
    this.taskSearchValues.categoryId = category ? category.id : 0;

    // обновить список задач согласно выбранной категории и другим параметрам поиска из taskSearchValues
    this.searchTasks(this.taskSearchValues);

    if (this.isMobile) {
      this.menuOpened = false; // для мобильных - автоматически закрываем боковое меню
    }
  }

  // добавление категории
  addCategory(category: Category) {
    this.categoryService.add(category).subscribe(result => {
      // если вызов сервиса завершился успешно - добавляем новую категорию в локальный массив

      this.searchCategory(this.categorySearchValues);
    }
    );
  }

  // удаление категории
  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(cat => {
      this.selectedCategory = new Category(0,''); // выбираем категорию "Все"

      this.searchCategory(this.categorySearchValues);
      this.selectCategory(this.selectedCategory);

    });
  }

  // обновлении категории
  updateCategory(category: Category) {
    this.categoryService.update(category).subscribe(() => {

      this.searchCategory(this.categorySearchValues); // обновляем список категорий
      this.searchTasks(this.taskSearchValues); // обновляем список задач

    });
  }

  // поиск категории
  searchCategory(categorySearchValues: CategorySearchValues) {

    this.categoryService.findCategories(categorySearchValues).subscribe(result => {
      this.categories = result;
    });

  }

  // показать-скрыть статистику

  toggleStat(showStat: boolean) {
    this.showStat = showStat;

  }


  // показать-скрыть поиск

  toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;


  }

  // поиск задач
  searchTasks(searchTaskValues: TaskSearchValues) {

    this.taskSearchValues = searchTaskValues;


    this.taskService.findTasks(this.taskSearchValues).subscribe(result => {

      // Если выбранная страница для отображения больше, чем всего страниц - заново делаем поиск и показываем 1ю страницу.
      // Если пользователь был например на 2й странице общего списка и выполнил новый поиск, в результате которого доступна только 1 страница,
      // то нужно вызвать поиск заново с показом 1й страницы (индекс 0)
      if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
        this.taskSearchValues.pageNumber = 0;
        this.searchTasks(this.taskSearchValues);
      }

      this.totalTasksFounded = result.totalElements; // сколько данных показывать на странице
      this.tasks = result.content; // массив задач
    });


  }


  // обновить общую статистику и счетчик для категории Все (и показать эти данные в дашборде, если выбрана категория "Все")
  updateOverallCounter() {

    this.statService.getOverallStat().subscribe((res => { // получить из БД актуальные данные
      this.stat = res; // получили данные из БД
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal; // для счетчика категории "Все"

      if (!this.selectedCategory) { // если выбрана категория "Все" (selectedCategory === null)
        this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal); // заполнить дашборд данными общей статистики
      }

    }));

  }


  // обновить счетчик конкретной категории (и показать эти данные в дашборде, если выбрана эта категория)
  updateCategoryCounter(category: Category) {

    this.categoryService.findById(category.id).subscribe(cat => { // получить из БД актуальные данные

      this.categories[this.getCategoryIndex(category)] = cat; // заменить в локальном массиве

      this.showCategoryDashboard(cat);  // показать дашборд со статистикой категории

    });
  }

  // показать дэшборд с данными статистики из категроии
  showCategoryDashboard(cat: Category) {
    if (this.selectedCategory && this.selectedCategory.id === cat.id) { // если выбрана та категория, где сейчас работаем
      this.fillDashData(cat.completedCount, cat.uncompletedCount); // заполнить дашборд данными статистики из категории
    }
  }


  // добавление задачи
  addTask(task: Task) {

    this.taskService.add(task).subscribe(result => {

      if (task.category) { // если в новой задаче была указана категория
        this.updateCategoryCounter(task.category); // обновляем счетчик для указанной категории
      }

      this.updateOverallCounter(); // обновляем всю статистику (в том числе счетчик для категории "Все")

      this.searchTasks(this.taskSearchValues); // обновляем список задач

    });


  }


  // удаление задачи
  deleteTask(task: Task) {

    this.taskService.delete(task.id).subscribe(result => {

      if (task.category) { // если в удаленной задаче была указана категория
        this.updateCategoryCounter(task.category); // обновляем счетчик для указанной категории
      }

      this.updateOverallCounter(); // обновляем всю статистику (в том числе счетчик для категории "Все")

      this.searchTasks(this.taskSearchValues); // обновляем список задач

    });


  }


  // обновление задачи
  updateTask(task: Task) {

    this.taskService.update(task).subscribe(result => {

      if (task.oldCategory) { // если в изменной задаче старая категория была указана
        this.updateCategoryCounter(task.oldCategory); // обновляем счетчик для старой категории
      }

      if (task.category) { // если в изменной задаче новая категория была указана
        this.updateCategoryCounter(task.category); // обновляем счетчик для новой категории
      }

      this.updateOverallCounter(); // обновляем всю статистику (в том числе счетчик для категории "Все")

      this.searchTasks(this.taskSearchValues); // обновляем список задач

    });


  }

  // показать-скрыть меню
  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }


  // если закрыли меню любым способом - ставим значение false
  onClosedMenu() {
    this.menuOpened = false;
  }

  // параметры отображения меню (зависит от устройства пользователя)
  setMenuDisplayParams() {
    this.menuPosition = 'left'; // меню слева

    // настройки бокового меню для моб. и десктоп вариантов
    if (this.isMobile) {
      this.menuOpened = false; // на моб. версии по-умолчанию меню будет закрыто
      this.menuMode = 'over'; // поверх всего контента
      this.showBackdrop = true; // если нажали на область вне меню - закрыть его
    } else {
      this.menuOpened = true; // НЕ в моб. версии по-умолчанию меню будет открыто (т.к. хватает места)
      this.menuMode = 'push'; // будет "толкать" основной контент, а не закрывать его
      this.showBackdrop = false;
    }

  }


  // изменили кол-во элементов на странице или перешли на другую страницу
  // с помощью paginator
  paging(pageEvent: PageEvent) {

    // если изменили настройку "кол-во на странице" - заново делаем запрос и показываем с 1й страницы
    if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
      this.taskSearchValues.pageNumber = 0; // новые данные будем показывать с 1-й страницы (индекс 0)
    } else {
      // если просто перешли на другую страницу
      this.taskSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.taskSearchValues.pageSize = pageEvent.pageSize;
    this.taskSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchTasks(this.taskSearchValues); // показываем новые данные
  }


  // были ли изменены настройки приложения
  settingsChanged(priorities: Priority[]) {
    // this.fillAllPriorities(); // заново загрузить все категории из БД (чтобы их можно было сразу использовать в задачах)
    this.priorities = priorities; // получаем измененные массив с приоритетами
    this.searchTasks(this.taskSearchValues); // обновить текущие задачи и категории для отображения
  }

  // находит индекс элемента (по id) в локальном массиве

  getCategoryFromArray(id: number): Category {
    const tmpCategory = this.categories.find(t => t.id === id);
    if(tmpCategory) return tmpCategory;
    else return new Category(0,'')
  }

  getCategoryIndex(category: Category): number {
    const tmpCategory = this.categories.find(t => t.id === category.id);
    if(tmpCategory) return this.categories.indexOf(tmpCategory);
    else return -1
  }

  getCategoryIndexById(id: number): number {
    const tmpCategory = this.categories.find(t => t.id === id);
    if(tmpCategory) return this.categories.indexOf(tmpCategory);
    else return -1
  }


}





// refresh stat zip - join observeble methods -> call - wait - get data
/* updateStat(): void {
  zip(
    this.dataHandler.getTotalCountInCategory(this.selectedCategory),
  this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
  this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
  this.dataHandler.getUncompletedTotalCount())

      .subscribe(array => {
    this.totalTasksCountInCategory = array[0];
    this.completedCountInCategory = array[1];
    this.uncompletedCountInCategory = array[2];
    this.uncompletedTotalTasksCount = array[3]; // need for category All
  });
} */



