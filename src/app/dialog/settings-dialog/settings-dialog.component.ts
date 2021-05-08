import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Priority } from 'src/app/model-nvv/Priority';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})

// диалоговое окно настроек приложения
// т.к. настройки не привязаны к другим компонентам (окнам),
// то он самостоятельно может загружать нужные данные с помощью dataHandler (а не получать их с помощью @Input)
export class SettingsDialogComponent implements OnInit {

  prioritiesSet: Priority[];

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>, // для возможности работы с текущим диалог. окном
    
  ) { this.prioritiesSet=[] }

  ngOnInit(): void {
    // получаем все значения, чтобы отобразить настроку цветов
    this.dataHandler.getAllPriorities().subscribe(priorities => this.prioritiesSet = priorities);
  }

  onClose() {
    this.dialogRef.close(false);
  }

  // т.к. мы меняем значения в массивах, то изменения сразу отражаются на списке задач (не требуется доп. обновления)

  onAddPriority(priority: Priority): void {
      this.dataHandler.addPriority(priority).subscribe();
  }

  onDeletePriority(priority: Priority): void {
      this.dataHandler.deletePriority(priority).subscribe();
  }

  onUpdatePriority(priority: Priority): void {
      this.dataHandler.updatePriority(priority).subscribe();
  }
}
