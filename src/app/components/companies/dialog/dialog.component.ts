import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OS } from '../../../shared/models/os';
import { Company } from 'src/app/shared/models/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public company: Company) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEdit() {
    localStorage.setItem('_id_company', this.company._id);
    this.router.navigate(['/crm/register']);
    this.dialogRef.close();
  }

  onDelete() {

  }

  print() {

  }

  downloadPDF() {

  }

}