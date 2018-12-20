import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';

import { ApiService } from 'src/app/core/http/api.service';
import { AppService } from 'src/app/shared/Services/app.service';
import { DialogConfirmComponent } from '../../confirm/confirm.component';
import { Company } from 'src/app/shared/models/company';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private router: Router,

    @Inject(MAT_DIALOG_DATA) public company: Company,
    public dialogRef: MatDialogRef<DialogComponent>,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

    private apiService: ApiService,
    private appService: AppService,
  ) { }

  /**Fecha a janela de diálogo */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /** Guarda o id da da empresa e muda para a janela de edição */
  onEdit() {
    localStorage.setItem('_id_company', this.company._id);
    this.router.navigate(['/crm/register']);
    this.dialogRef.close();
  }

  /** Marca o arquivo como deletado */
  onDelete() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: 'Deseja realmente excluir?' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.custom_objects_set_keys('company', this.company._id, { 'deleted': true })
          .subscribe((data: Company) => {
            if (!data.error) {
              this.appService.openSnackBar('Empresa deletada', 'ok');
              this.dialogRef.close('load');
            } else {
              this.appService.session(data.error_code);
            }
          }, (data) => {
            this.appService.openSnackBar('Erro comunicar com o servidor', 'ok');
            console.log(data);
          });
      }
    })
  }

  /** Imprime o layout */
  print() {
    this.appService.printCompany(this.company);
  }

  /** Realiza o Download de um PDF do Layout */
  downloadPDF() {
    this.appService.downloadCompany(this.company);
  }
}