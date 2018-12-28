import { Component, OnInit } from '@angular/core';

import { MatSnackBar, MatDialog } from '@angular/material';

import { ApiService } from '../../../core/http/api.service';
import { ProductionComponent } from '../../production/component/production.component';
import { DialogComponent } from '../dialog/dialog.component';
import { Result_OS } from '../../../shared/models/api';
import { OS } from '../../../shared/models/os';
import { AppService } from 'src/app/shared/Services/app.service';
import { DialogConfirmComponent } from '../../confirm/confirm.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preset',
  templateUrl: './preset.component.html',
  styleUrls: ['./preset.component.css']
})
export class PresetComponent implements OnInit {

  preset: OS[];

  constructor(
    private router: Router,

    public snackBar: MatSnackBar,
    public dialog: MatDialog,

    private apiService: ApiService,
    private appService: AppService,
    private production: ProductionComponent
  ) { }

  ngOnInit() {
    //lista todas as ordens de serviço ao iniciar
    this.list(['deleted', 'equal to', false]);
    this.production.title = 'Predefinições';
    this.production.dashboard = '';
    this.production.preset = 'rgb(0, 90, 176)';
    this.production.jobs = '';
    this.production.storage = '';
  }

  /** Abre caixa de dialogo com as informações da ordem de serviço */
  openDialog(id: string): void {
    this.apiService.custom_objects_get('preset', id)
      .subscribe((data: OS) => {
        if (!data.error) {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '100vw',
            data: data
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result == 'load') {
              this.list(['deleted', 'equal to', false]);
            }
          });
        }
      }, (data) => {
        console.log(data);
      })
  }

  /**busca no banco de dados as ordens de serviço */
  list(query) {

    this.apiService.custom_objects_list('preset', query,
      {
        'nome': 'nome'
      })
      .subscribe((data: Result_OS) => {
        if (!data.error) {
          //inserção de dados na tabela

          this.preset = data.results;

        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Marca a ordem de serviço como deletada */
  onDelete(id: string) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: 'Deseja realmente excluir?' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.custom_objects_set_keys('preset', id, { 'deleted': true })
          .subscribe((data: Result_OS) => {
            if (!data.error) {
              this.list(['deleted', 'equal to', false]);
              this.appService.openSnackBar('Ordem de serviço foi excluida', 'ok');
            } else {
              this.appService.session(data.error_code);
            }
          }, (data) => {
            console.log(data);
          });
      }
    })
  }

   /** Entra na pagina de cadastro de ordem de servico */
   onAdd() {
    if (localStorage.getItem('_id_preset')) {
      localStorage.removeItem('_id_preset');
    }
    this.router.navigate(['/production/new-preset']);
  }

}
