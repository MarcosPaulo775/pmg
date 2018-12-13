import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OS } from '../../../shared/models/os';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { Router } from '@angular/router';
import { Result_OS } from 'src/app/shared/models/api';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private appService: AppService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public os: OS) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  total: number;

  onEdit() {
    if (this.os._id != null) {
      localStorage.setItem('_id', this.os._id);
      this.router.navigate(['/production/os']);
      this.dialogRef.close();
    }
  }

  onDelete() {
    this.apiService.custom_objects_set_keys('os', this.os._id, { 'deleted': 'true' })
      .subscribe((data: Result_OS) => {
        this.dialogRef.close('load');
      }, (data) => {
      });
  }

  print(){

    this.appService.printOS(this.os);

  }

  downloadPDF(){

    this.appService.downloadOS(this.os);
    
  }
 
}