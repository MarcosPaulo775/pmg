import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductionComponent } from '../../production/component/production.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from '../../../core/http/api.service';
import { Result_OS, Count } from '../../../shared/models/api';
import { Os } from '../../../shared/models/os';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { query } from '@angular/core/src/render3/query';

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

  /** Etapas da ordem de serviço
   * Irei mudar para o banco de dados futuramente
   */
  all: number;
  atendimento: number;
  desenvolvimento: number;
  aprovacao: number;
  editoracao: number;
  conferencia: number;
  gravacao: number;
  expedicao: number;
  status: string;

  /** Variaveis da tabela */
  dataSource: MatTableDataSource<Os>;
  selection = new SelectionModel<Os>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private production: ProductionComponent,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    //lista todas as ordens de serviço ao iniciar
    this.list(['deleted', 'equal to', 'false']);
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
  list(query) {
    this.count();
    this.apiService.custom_objects_list('Os', query, ' ')
      .subscribe((data: Result_OS) => {
        if (data.error == null) {
          //inserção de dados na tabela
          this.dataSource = new MatTableDataSource(data.results.reverse());
          this.dataSource.paginator = this.paginator;
          this.selection.clear();
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });
  }

  /** Muda a busca caso queira buscar todos */
  onFlow(query: string) {
    if (query == 'all') {
      this.list(['deleted', 'equal to', 'false']);
    } else {
      this.list(['status', 'equal to', query]);
    }
  }

  count() {
    this.apiService.custom_objects_count('Os', ['deleted', 'equal to', 'false'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.all = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_count('Os', ['status', 'equal to', 'Atendimento'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.atendimento = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_count('Os', ['status', 'equal to', 'Desenvolvimento'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.desenvolvimento = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_count('Os', ['status', 'equal to', 'Aprovação'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.aprovacao = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_count('Os', ['status', 'equal to', 'Editoração'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.editoracao = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_count('Os', ['status', 'equal to', 'Conferência'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.conferencia = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_count('Os', ['status', 'equal to', 'Gravação'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.gravacao = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });

    this.apiService.custom_objects_count('Os', ['status', 'equal to', 'Expedição'])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.expedicao = data.count;
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
      this.apiService.custom_objects_set_keys('Os', selected[i]._id, { 'status': status })
        .subscribe((data) => {
          if (i == (selected.length - 1)) {
            this.list(['deleted', 'equal to', 'false']);
          }
        }, (data) => {
        });
    }
  }

  /** Entra na pagina de cadastro de ordem de servico */
  onAdd() {
    if (localStorage.getItem('_id')) {
      localStorage.removeItem('_id');
    }
    this.router.navigate(['/production/os']);
  }

  /** Marca a ordem de serviço como deletada */
  onDelete(id: string) {
    this.apiService.custom_objects_set_keys('Os', id, { 'deleted': 'true' })
      .subscribe((data: Result_OS) => {
        this.session(data.error_code);
        this.list(['deleted', 'equal to', 'false']);
      }, (data) => {
      });
  }

  /** Edita a ordem de serviço */
  onEdit(id: string) {
    if (id != null) {
      localStorage.setItem('_id', id);
      this.router.navigate(['/production/os']);
    }
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


