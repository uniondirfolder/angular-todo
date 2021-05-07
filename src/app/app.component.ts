import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TRANSLATIONS } from '@angular/core';
import { FilterStateTask } from './data-nvv/dao/enum/FilterStateTasks';
import { NoValue } from './data-nvv/dao/enum/NoValue';
import { Category } from './model-nvv/Category';
import { Priority } from './model-nvv/Priority';
import { Task } from './model-nvv/Task';
import { DataHandlerService } from './service-nvv/data-handler.service';
import { zip } from "rxjs";
import { concatMap, map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';

  // коллекция категорий с кол-вом незавершенных задач для каждой из них
  categoryMap = new Map<Category, number>();

  tasks: Task[] = [];
  categories: Category[] = []; // all categories
  priorities: Priority[] = []; // all priorities
  selectedCategory: Category = new Category(0, '');

  // пошук
  searchTaskText = ''; // поточне значення для пошуку завдань
  searchCategoryText = ''; // поточне значення для пошуку категорій

  // фільтрація
  statusFilter: FilterStateTask = FilterStateTask.All;
  priorityFilter: Priority = new Priority(0, '', '');

  // статистика
  totalTasksCountInCategory: number = -1;
  completedCountInCategory: number = -1;
  uncompletedCountInCategory: number = -1;
  uncompletedTotalTasksCount: number = -1;
  // show/hide stat
  showStat = true;

  constructor(
    private dataHandler: DataHandlerService, // фасад для работы с данными
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.fillCategories();
    this.onSelectCategory(NoValue.Yes);
  }


  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  // зміна категорії
  onSelectCategory(category: Category | NoValue) {

    if (category != NoValue.Yes) { this.selectedCategory = category }
    this.updateTasksAndStat();
  }

  // видалення категорії
  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category).subscribe(cat => {
      this.selectedCategory.id = 0; // відкриваємо категорію "Все"
      this.selectedCategory.title = '';
      this.categoryMap.delete(cat); // delete from map
      this.onSearchCategory(this.searchCategoryText);
      this.updateTasks();
    });
  }

  // оновлення категорії
  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      //this.onSelectCategory(this.selectedCategory);
      this.onSearchCategory(this.searchCategoryText);
    });
  }

  // new category
  onAddCategory(title: string): void {
    this.dataHandler.addCategory(new Category(0, title)).subscribe(() => this.updateCategories());
  }
  private fillCategories() {

    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

    // для каждой категории посчитать кол-во невыполненных задач

    this.categories.forEach(cat => {
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count));
    });

  }
  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(cat => this.categories = cat);
  }

  // search category
  onSearchCategory(title: string): void {

    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;

    });
  }

  // new task
  /* onAddTask(task: Task) {
    this.dataHandler.addTask(task).subscribe(result => {
      this.updateTasksAndStat();
    });
  } */
  onAddTask(task: Task) {
    this.dataHandler.addTask(task).pipe(// сначала добавляем задачу
      concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
        // .. и считаем кол-во задач в категории с учетом добавленной задачи
        return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
          return ({ t: task, count }); // в итоге получаем массив с добавленной задачей и кол-вом задач для категории
        }));
      }
      )).subscribe(result => {

        const t = result.t as Task;

        // если указана категория - обновляем счетчик для соотв. категории
        if (t.category) {
          this.categoryMap.set(t.category, result.count);
        }

        this.updateTasksAndStat();

      });

  }
  // оновлення завдання
  onUpdateTask(task: Task) { // for intr is good but not well for medium
    /* this.dataHandler.updateTask(task).subscribe(cat => {
      this.updateTasksAndStat()
    }); */
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTasksAndStat();
    });
  }

  // видалення завдання
  /* onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task).subscribe(cat => {
      this.updateTasksAndStat()
    });
  } */
  onDeleteTask(task: Task) {
    if (task.category) {
      this.dataHandler.deleteTask(task).pipe(
        concatMap(task => {
          return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({ t: task, count });
          }));
        }
        )).subscribe(result => {

          const t = result.t as Task;
          if (t.category) this.categoryMap.set(t.category, result.count);

          this.updateTasksAndStat();

        });
    }

  }
  // пошук завдань
  onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фільтрація завдань по статусу (все, вирішені, невирішені)
  onFilterTasksByStatus(status: FilterStateTask) {

    this.statusFilter = status;
    this.updateTasks();
  }

  // фільтрація завдань по статусу (все, вирішені, невирішені)
  onFilterTasksByPriority(priority: Priority) {
    console.log(priority)
    this.priorityFilter = priority;
    this.updateTasks();
  }
  sendRequest() {
    this.http.get('', { params: {} }).subscribe(result => console.log(result))
  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  updateTasksAndStat(): void {

    this.updateTasks(); // обновить список задач

    // обновить переменные для статистики
    this.updateStat();

  }
  // refresh stat zip - join observeble methods -> call - wait - get data
  private updateStat(): void {
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
  }

  // show/hide stat
  toggleStat(showStat: boolean): void {
    this.showStat = showStat;
  }

}
