import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OS } from '../../../shared/models/os';
import { Company } from 'src/app/shared/models/company';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public company: Company) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}