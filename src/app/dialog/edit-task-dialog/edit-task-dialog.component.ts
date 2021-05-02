import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/model-nvv/Category';
import { Priority } from 'src/app/model-nvv/Priority';
import { Task } from 'src/app/model-nvv/Task';
import { DataHandlerService } from 'src/app/service-nvv/data-handler.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})

// редактирование/создание задачи
export class EditTaskDialogComponent implements OnInit {

  dialogTitle: string = ""; // заголовок окна
  private task: Task = new Task(0, "", false); // задача для редактирования/создания
  categories: Category[] = [];
  priorities: Priority[] = [];

  tmpTitle: string = ""; // читаем сохраняем через посредника
  tmpCategory: Category = new Category(0, "");
  tmpPriority: Priority = new Priority(0, "", "");

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для взаимодействии с текущим д/а
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные: которые передали в д/а
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog, // для открытия нового д/а (из текущего) - подтверждения crud
  ) { }

  ngOnInit(): void {
    this.dialogTitle = this.data[1];
    this.task = this.data[0];

    this.tmpTitle = this.task.title;
    if (this.task.category != undefined) { this.tmpCategory = this.task.category };
    if (this.task.priority != undefined) { this.tmpPriority = this.task.priority };

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);
  }
  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    // передаем добавленую/измененную задачу в обработчик
    // что с ним будут делать - уже не задача этого компонента
    this.dialogRef.close(this.task);
  }
  onCancel(): void {
    this.dialogRef.close(null);
  }
}
