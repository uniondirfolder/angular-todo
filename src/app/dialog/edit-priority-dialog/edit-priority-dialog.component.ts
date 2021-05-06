import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperType } from 'src/app/data-nvv/dao/enum/OperType';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {
  dialogTitle: string = '';
  priorityTitle: string = '';
  operType: OperType = OperType.EMPTY;

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
  }

  onConfirm(): void {
    this.dialogRef.close(this.priorityTitle);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Підтвердіть дію.',
        message: `Ви дійсно бажаєте видалити приорітет: "${this.priorityTitle}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });


  }
  canDelete(): boolean {
    return this.operType == OperType.EDIT;
  }
}
