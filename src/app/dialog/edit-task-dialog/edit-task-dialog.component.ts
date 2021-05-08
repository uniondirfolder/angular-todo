import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperType } from 'src/app/data-nvv/dao/enum/OperType';
import { Category } from 'src/app/model-nvv/Category';
import { Priority } from 'src/app/model-nvv/Priority';
import { Task } from 'src/app/model-nvv/Task';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})

// редактирование/создание задачи
export class EditTaskDialogComponent implements OnInit {

  dialogTitle = ''; // заголовок окна
  task: Task = new Task(0, '', false); // задача для редактирования/создания
  operType: OperType = OperType.EMPTY; // тип операции

  categories: Category[] = [];
  priorities: Priority[] = [];

  tmpTitle = ''; // читаем сохраняем через посредника
  tmpCategory: Category = new Category(0, '');
  tmpPriority: Priority = new Priority(0, '', '');
  tmpDate = '';

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для взаимодействии с текущим д/а
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType], // данные: которые передали в д/а
    private dialog: MatDialog, // для открытия нового д/а (из текущего) - подтверждения crud
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data[1];
    this.task = this.data[0];
    this.operType = this.data[2];

    this.tmpTitle = this.task.title;
    if (this.task.category !== undefined) { this.tmpCategory = this.task.category; }
    if (this.task.priority !== undefined) { this.tmpPriority = this.task.priority; }
    if (this.task.date !== undefined) { this.tmpDate = this.task.date.toString(); }

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);
  }
  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = new Date(this.tmpDate);
    // передаем добавленую/измененную задачу в обработчик
    // что с ним будут делать - уже не задача этого компонента
    this.dialogRef.close(this.task);
  }
  onCancel(): void {
    this.dialogRef.close(null);
  }
  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: '500px', data: {
          dialogTitle: 'Підтвердіть дію',
          message: `Ви дійсно бажаєте видалити завдання: "${this.task.title}"?`
        },
        autoFocus: false
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
  onComplete(): void {
    this.dialogRef.close('complete');
  }
  onActivate(): void {
    this.dialogRef.close('activate');
  }
  // используем для показать/скрыть кнопка удаления
  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }
  canActivateDesactivate(): boolean {
    return this.canDelete();
  }
}
