import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';

import { ApiService } from '../../../core/http/api.service';
import { ProductionComponent } from '../../production/component/production.component';
import { DialogComponent } from '../../storage/dialog/dialog.component';
import { Result_OS, Count } from '../../../shared/models/api';
import { OS } from '../../../shared/models/os';
import { AppService } from 'src/app/shared/Services/app.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  /** Colunas na tabela */
  displayedColumns: string[] = [
    'select',
    'id',
    'Cliente',
    'Nome do trabalho',
    'Pedido',
    'Data',
    'Status',
    'Ações'
  ];

  all: number;

  /** Variaveis da tabela */
  dataSource: MatTableDataSource<OS>;
  selection = new SelectionModel<OS>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,

    private apiService: ApiService,
    private appService: AppService,
    private production: ProductionComponent
  ) { }

  ngOnInit() {
    //lista todas as ordens de serviço ao iniciar
    this.list(['deleted', 'equal to', false, 'and', 'status', 'equal to', 'Arquivado']);
    this.production.title = 'Arquivados';
    this.production.dashboard = '';
    this.production.print = '';
    this.production.jobs = '';
    this.production.storage = 'rgb(0, 90, 176)';
  }

  /** Abre caixa de dialogo com as informações da ordem de serviço */
  openDialog(id: string): void {
    this.apiService.custom_objects_get('os', id)
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
    this.count();
    this.apiService.custom_objects_list('os', query,
      {
        'nome': 'nome',
        'os': 'os',
        'cliente': 'cliente',
        'pedido': 'pedido',
        'data': 'data',
        'status': 'status'
      })
      .subscribe((data: Result_OS) => {
        if (!data.error) {
          //inserção de dados na tabela
          this.dataSource = new MatTableDataSource(data.results.reverse());
          this.dataSource.paginator = this.paginator;
          this.selection.clear();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Conta o numero de OS arquivadas */
  count() {
    this.apiService.custom_objects_count('os', ['deleted', 'equal to', false, 'and', 'status', 'equal to', 'Arquivado'])
      .subscribe((data: Count) => {
        if (!data.error) {
          this.all = data.count;
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Retorna a OS aquivada para Expedição */
  storage(id) {
    this.apiService.custom_objects_set_keys('os', id, { 'status': 'Expedição' })
      .subscribe((data: OS) => {
        if(!data.error){
          this.list(['deleted', 'equal to', false, 'and', 'status', 'equal to', 'Arquivado']);
          this.appService.openSnackBar('Ordem de serviço retornou para Expedição', 'ok');
        }else{
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Marca a ordem de serviço como deletada */
  onDelete(id: string) {
    this.apiService.custom_objects_set_keys('os', id, { 'deleted': 'true' })
      .subscribe((data: Result_OS) => {
        if(!data.error){
          this.list(['deleted', 'equal to', false]);
          this.appService.openSnackBar('Ordem de serviço foi excluida', 'ok');
        }else{
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      });
  }

  /** Aplica um filtro na tabela */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
