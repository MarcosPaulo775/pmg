import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';

import { OS } from '../../../shared/models/os';
import { Result_OS } from 'src/app/shared/models/api';
import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { DialogConfirmComponent } from '../../confirm/confirm.component';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private router: Router,

    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public os: OS,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

    private apiService: ApiService,
    private appService: AppService
  ) { }

  /** Guarda id da OS no localstorage e muda para a pagina de edição */
  onEdit() {
    if (this.os._id) {
      localStorage.setItem('_id', this.os._id);
      this.router.navigate(['/production/os']);
      this.dialogRef.close();
    }
  }

  /** Marca a OS como deletada */
  onDelete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {data: 'Deseja realmente excluir?'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.custom_objects_set_keys('os', this.os._id, { 'deleted': true })
          .subscribe((data: Result_OS) => {
            if (!data.error) {
              this.openSnackBar('Ordem de serviço deletada', 'ok');
              this.dialogRef.close('load');
            } else {
              this.session(data.error_code);
            }
          }, (data) => {
            this.openSnackBar('Erro ao comunicar com servidor', 'ok');
            console.log(data);
          });
      }
    })
  }

  /** Imprime Layout */
  print() {
    this.appService.printOS(this.os);
  }

  /** Faz download do layout */
  downloadPDF() {
    this.appService.downloadOS(this.os);
  }

  /** Verifica se a sessão e válida */
  session(error_code: string) {
    if (error_code == 'invalid_session') {
      if (localStorage.getItem('session')) {
        localStorage.removeItem('session');
      } this.router.navigate(['/login']);
    }
  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  /** Fecha a caixa de dialogo */
  onNoClick(): void {
    this.dialogRef.close();
  }
}