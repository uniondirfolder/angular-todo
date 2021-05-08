import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {

  dialogTitle: string;
  message: string;
  constructor(
    private dialogRef: MatDialogRef<AboutDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } // данные, которые передали в диалоговое окно
  ) {
    // текст для диалогового окна
    this.dialogTitle = data.dialogTitle; // заголовок
    this.message = data.message; // сообщение
  }

  ngOnInit(): void {
  }

  // нажали ОК
  confirm(): void {
    this.dialogRef.close(true);
  }
}
