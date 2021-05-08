import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperType } from 'src/app/data-nvv/dao/enum/OperType';
import { Category } from 'src/app/model-nvv/Category';
import { DialogAction, DialogResult } from 'src/app/object/DialogResult';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})

// создание/редактирование категории
export class EditCategoryDialogComponent implements OnInit {

  dialogTitle: string = ''; // текст для диалогового окна
  //@ts-ignore
  category: Category; // переданный объект для редактирования
  canDelete = true; // можно ли удалять объект (активна ли кнопка удаления)

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Category, string], // данные, которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) { }

  ngOnInit(): void {
    // получаем переданные в диалоговое окно данные
    this.category = this.data[0];
    this.dialogTitle = this.data[1];

    // если было передано значение, значит это редактирование, поэтому делаем удаление возможным (иначе скрываем иконку)
    if (this.category && this.category.id && this.category.id > 0) {
      this.canDelete = true;
    }
  }
  // нажали ОК
  confirm(): void {
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.category));
  }

  // нажали отмену
  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  // нажали Удалить
  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.category.title}"? (сами задачи не удаляются)`
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
}
