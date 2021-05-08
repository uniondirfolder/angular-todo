import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PriorityService } from 'src/app/data-nvv/dao/impl/priority.service';
import { Priority } from 'src/app/model-nvv/Priority';
import { DialogAction, DialogResult } from 'src/app/object/DialogResult';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})

// диалоговое окно настроек приложения
// т.к. настройки не привязаны к другим компонентам (окнам),
// то он самостоятельно может загружать нужные данные с помощью dataHandler (а не получать их с помощью @Input)
export class SettingsDialogComponent implements OnInit {

  //@ts-ignore
  priorities: Priority[]; // список приоритетов для редактирования/удаления
  settingsChanged = false; // были ли изменены настройки

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>, // для возможности работы с текущим диалог. окном
    private priorityService: PriorityService // ссылка на сервис для работы с данными
    
  ) { }

  ngOnInit(): void {
    // получаем все значения, чтобы отобразить настройку цветов
    this.priorityService.findAll().subscribe(priorities => this.priorities = priorities);
  }

  // нажали Закрыть
  close(): void {

    if (this.settingsChanged) { // если в настройках произошли изменения
      this.dialogRef.close(new DialogResult(DialogAction.SETTINGS_CHANGE, this.priorities));
    } else {
      this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
    }
  }


  // добавили приоритет
  addPriority(priority: Priority): void {

    this.settingsChanged = true; // в настройках произошли изменения

    // сначала обновить в БД
    this.priorityService.add(priority).subscribe(result => {
      // т.к. данные простые и без сортировки - то можно просто добавить объект в локальный массив,
      // а не запрашивать заново из БД
      this.priorities.push(result);
    });
  }

  // удалили приоритет
  deletePriority(priority: Priority): void {

    this.settingsChanged = true; // в настройках произошли изменения

    // сначала обновить в БД
    this.priorityService.delete(priority.id).subscribe(() => {

        // т.к. данные простые и без сортировки - то можно просто удалить объект в локальном массиве,
        // а не запрашивать заново из БД
        this.priorities.splice(this.getPriorityIndex(priority), 1);
      }
    );
  }

  // обновили приоритет
  updatePriority(priority: Priority): void {

    this.settingsChanged = true; // в настройках произошли изменения

    // сначала обновить в БД
    this.priorityService.update(priority).subscribe(() => {

        // т.к. данные простые и без сортировки - то можно просто обновить объект в локальном массиве,
        // а не запрашивать заново из БД
        this.priorities[this.getPriorityIndex(priority)] = priority;
      }
    )
    ;
  }

  // находит индекс элемента (по id) в локальном массиве
  getPriorityIndex(priority: Priority): number {
    const tmpPriority = this.priorities.find(t => t.id === priority.id);
    if(tmpPriority) return this.priorities.indexOf(tmpPriority);
    else return -1
  }
}
