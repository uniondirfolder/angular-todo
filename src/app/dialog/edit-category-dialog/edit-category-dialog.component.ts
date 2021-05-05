import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperType } from 'src/app/data-nvv/dao/enum/OperType';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit {

  dialogTitle: string = ''; // текст для диалогового окна
  categoryTitle: string = ''; // текст для названия категории (при реактировании или добавлении)
  operType: OperType = OperType.EMPTY; // тип операции

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], // данные, которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) { }

  ngOnInit(): void {
    // получаем переданные в диалоговое окно данные
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
  }
  // нажали ОК
  onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel() {
    this.dialogRef.close(false);
  }

  // нажали Удалить
  onDelete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Підтвердіть дію',
        message: `Ви дійсно бажаєте вилучити категорію: "${this.categoryTitle}"? (власне завдання не видаляются)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }

  // используем для показать/скрыть кнопка удаления
  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }
}
