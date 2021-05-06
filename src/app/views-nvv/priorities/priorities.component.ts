import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperType } from 'src/app/data-nvv/dao/enum/OperType';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { EditPriorityDialogComponent } from 'src/app/dialog/edit-priority-dialog/edit-priority-dialog.component';
import { Priority } from 'src/app/model-nvv/Priority';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';

  // удалили
  @Output()
  deletePriority = new EventEmitter<Priority>();

  // change
  @Output()
  updatePriority = new EventEmitter<Priority>();

  // add
  @Output()
  addPriority = new EventEmitter<Priority>();

  // list prior for view
  @Input()
  priorities: Priority[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  delete(priority: Priority): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Підтвердіть дію',
        message: `Ви дійсно бажаєте видалити пріорітет: "${priority.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePriority.emit(priority);
      }
    });
  }

  onAddPriority(): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Новий пріорітет', OperType.ADD],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPriority = new Priority(0, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    });


  }

  onEditPriority(priority: Priority): void {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent, { data: [priority.title, 'Редактирование приоритета', OperType.EDIT] });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deletePriority.emit(priority);
        return;
      }

      if (result) {
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });


  }
}
