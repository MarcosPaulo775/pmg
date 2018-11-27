import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OS } from '../../../shared/models/os';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public os: OS) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  total: number;

}