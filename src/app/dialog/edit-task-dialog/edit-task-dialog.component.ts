import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Category } from 'src/app/model-nvv/Category';
import { Priority } from 'src/app/model-nvv/Priority';
import { Task } from 'src/app/model-nvv/Task';
import { DialogAction, DialogResult } from 'src/app/object/DialogResult';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})

// редактирование/создание задачи
export class EditTaskDialogComponent implements OnInit {

  // коллекции получаем из главной страницы (через параметры диалог. окна), чтобы здесь заново не делать запрос в БД
  //@ts-ignore
  categories: Category[];
  //@ts-ignore
  priorities: Priority[];

  // мобильное ли устройство
  isMobile = this.deviceService.isMobile();

  //@ts-ignore
  dialogTitle: string; // заголовок окна
  //@ts-ignore
  task: Task; // задача для редактирования/создания

  // сохраняем все значения в отдельные переменные,
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  //@ts-ignore
  newTitle: string;
  //@ts-ignore
  newPriorityId: number;
  //@ts-ignore
  newCategoryId: number;
  //@ts-ignore
  newDate: Date;

  // старый id категории тоже сохраняем, чтобы иметь возможность знать,
  // какая была до этого категория (нужно для правильного обновления счетчиков)
  //@ts-ignore
  oldCategoryId: number;


  canDelete = true; // можно ли удалять объект (активна ли кнопка удаления)
  canComplete = true; // можно ли завершить задачу (зависит от текущего статуса)

  today = new Date(); // сегодняшняя дата

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, Category[], Priority[]], // данные, которые передаем в текущее диалоговое окно
    private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
    private deviceService: DeviceDetectorService // определение устройства пользователя
  ) { }

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    this.categories = this.data[2]; // категории для выпадающего списка
    this.priorities = this.data[3]; // приоритеты для выпадающего списка

    // если было передано значение, значит это редактирование (не создание новой задачи),
    // поэтому делаем удаление возможным (иначе скрываем иконку)
    if (this.task && this.task.id > 0) {
      this.canDelete = true;
      this.canComplete = true;
    }

    // инициализация начальных значений (записывам в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)

    this.newTitle = this.task.title;

    // чтобы в html странице корректно работали выпадающие списки - лучше работать не с объектами, а с их id
    if (this.task.priority) {
      this.newPriorityId = this.task.priority.id;
    }

    if (this.task.category) {
      this.newCategoryId = this.task.category.id;
      this.oldCategoryId = this.task.category.id; // старое значение категории всегда будет храниться тут
    }

    if (this.task.date) {

      // создаем new Date, чтобы переданная дата из задачи автоматически сконвертировалась в текущий timezone
      // (иначе будет показывать время UTC)
      this.newDate = new Date(this.task.date);
    }
  }
  
  // нажали ОК
  confirm(): void {

    // считываем все значения для сохранения в поля задачи
    this.task.title = this.newTitle;
    this.task.priority = this.findPriorityById(this.newPriorityId);
    this.task.category = this.findCategoryById(this.newCategoryId);
    this.task.oldCategory = this.findCategoryById(this.oldCategoryId);

    if (!this.newDate) {
      //@ts-ignore
      this.task.date = null;
    } else {
      // в поле дата хранится в текущей timezone, в БД дата автоматически сохранится в формате UTC
      this.task.date = this.newDate;
    }


    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.task));

  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  // нажали Удалить
  delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) { // если просто закрыли окно, ничего не нажав
        return;
      }


      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE)); // нажали удалить
      }
    });
  }

  // нажали Выполнить (завершить) задачу
  complete() {
    this.dialogRef.close(new DialogResult(DialogAction.COMPLETE));

  }

  // делаем статус задачи "незавершенным" (активируем)
  activate() {
    this.dialogRef.close(new DialogResult(DialogAction.ACTIVATE));
  }

  // поиск приоритета по id
  private findPriorityById(tmpPriorityId: number): Priority {
    const tmpObj = this.priorities.find(t => t.id === tmpPriorityId);
    if(tmpObj) return tmpObj ;
    else return new Priority(0,'','');
  }

  // поиск категории по id
  private findCategoryById(tmpCategoryId: number): Category {
    const tmpObj = this.categories.find(t => t.id === tmpCategoryId)
    if(tmpObj) return tmpObj ;
    else return new Category(0,'');
  }

  // установка даты + кол-во дней
  addDays(days: number) {
    this.newDate = new Date();
    this.newDate.setDate(this.today.getDate() + days);
  }

  // установка даты "сегодня"
  setToday() {
    this.newDate = this.today;
  }

}
