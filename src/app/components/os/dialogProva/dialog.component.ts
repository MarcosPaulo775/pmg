import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Os, Color } from '../../../shared/models/os';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogProvaComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogProvaComponent>,
    @Inject(MAT_DIALOG_DATA) public color: Color) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}