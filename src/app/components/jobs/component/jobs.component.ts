import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductionComponent } from '../../production/component/production.component';
import { SelectionModel } from '@angular/cdk/collections';
import { JobsService } from '../../../core/http/jobs.service';
import { Result_OS } from '../../../shared/models/api';
import { Os } from '../../../shared/models/os';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {

  /** Colunas na tabela */
  displayedColumns: string[] = [
    'select',
    'id',
    'Cliente',
    'Nome do trabalho',
    'Status',
    'Ações'
  ];

  dataSource: MatTableDataSource<Os>;
  selection = new SelectionModel<Os>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private production: ProductionComponent,
    private jobsService: JobsService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.list();
    this.production.title = 'Trabalhos';
  }

  /** Abre caixa de dialogo com as informações da ordem de serviço */
  openDialog(os: Os): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: os
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /**busca no banco de dados as ordens de serviço */
  list() {
    this.jobsService.custom_objects_list()
      .subscribe((data: Result_OS) => {
        console.log(data);
        if (data.error == null) {
          //inserção de dados na tabela
          this.dataSource = new MatTableDataSource(data.results);
          this.dataSource.paginator = this.paginator;
          this.selection.clear();
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });
  }

  /** Muda o status dos itens selecionados na tabela */
  flow(status: string) {
    let selected = this.selection.selected;
    for (let i = 0; i < selected.length; i++) {
      this.jobsService.custom_objects_set_keys(selected[i]._id, { 'status': status })
        .subscribe((data) => {
          if (i == (selected.length - 1)) {
            this.list();
          }
        }, (data) => {
        });
    }
  }

  /** Marca a ordem de serviço como deletada */
  onDelete(id: string) {
    this.jobsService.custom_objects_set_keys(id, { 'deleted': 'true' })
      .subscribe((data: Result_OS) => {
        this.session(data.error_code);
      }, (data) => {
      });
    this.list();
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

  /** Verifica se a sessão e válida */
  session(error_code: string) {
    if (error_code == 'invalid_session') {
      if (localStorage.getItem('session')) {
        localStorage.removeItem('session');
      } this.router.navigate(['/login']);
    }
  }

}


