import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { Result_OS } from 'src/app/shared/models/api';
import { OS } from '../../../shared/models/os';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  total: number;

  constructor(
    private router: Router,

    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public os: OS,

    private apiService: ApiService,
    private appService: AppService,
  ) { }

  /** Edita a ordem de serviço */
  onEdit() {
    if (this.os._id) {
      localStorage.setItem('_id', this.os._id);
      this.router.navigate(['/production/os']);
      this.dialogRef.close();
    }
  }

  /** Marca a ordem de serviço como deletada */
  onDelete() {
    this.apiService.custom_objects_set_keys('os', this.os._id, { 'deleted': 'true' })
      .subscribe((data: Result_OS) => {
        if (!data.error) {
          this.openSnackBar('Ordem de serviço foi excluida', 'ok');
          this.dialogRef.close('load');
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Imprime Layout */
  print() {
    this.appService.printOS(this.os);
  }

  /** Faz download do layout */
  downloadPDF() {
    this.appService.downloadOS(this.os);
  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  /** Verifica se a sessão e válida */
  session(error_code: string) {
    if (error_code == 'invalid_session') {
      if (localStorage.getItem('session')) {
        localStorage.removeItem('session');
      } this.router.navigate(['/login']);
    }
  }

  /** Fecha a caixa de dialogo */
  onNoClick(): void {
    this.dialogRef.close();
  }
}