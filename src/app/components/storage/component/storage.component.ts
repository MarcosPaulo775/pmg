import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductionComponent } from '../../production/component/production.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from '../../../core/http/api.service';
import { Result_OS, Count } from '../../../shared/models/api';
import { OS } from '../../../shared/models/os';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

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

  all_s: string;
  atendimento_s: string;
  desenvolvimento_s: string;
  aprovacao_s: string;
  editoracao_s: string;
  conferencia_s: string;
  gravacao_s: string;
  expedicao_s: string;

  check: boolean;

  /** Variaveis da tabela */
  dataSource: MatTableDataSource<OS>;
  selection = new SelectionModel<OS>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private production: ProductionComponent,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    //lista todas as ordens de serviço ao iniciar
    this.list(['deleted', 'equal to', false, 'and', 'status', 'equal to', 'Arquivado']);
    this.production.title = 'Trabalhos';
    this.production.dashboard = '';
    this.production.print = '';
    this.production.jobs = '';
    this.production.storage = 'rgb(0, 90, 176)';

    this.atendimento_s = '';
    this.desenvolvimento_s = '';
    this.aprovacao_s = '';
    this.editoracao_s = '';
    this.conferencia_s = '';
    this.gravacao_s = '';
    this.expedicao_s = '';
    this.all_s = 'rgb(0, 90, 176)';
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
        if (data.error == null) {
          //inserção de dados na tabela
          this.atendimento = 0;
          this.desenvolvimento = 0;
          this.aprovacao = 0;
          this.editoracao = 0;
          this.conferencia = 0;
          this.gravacao = 0;
          this.expedicao = 0;

          for (let i = 0; i < data.results.length; i++) {
            switch (data.results[i].status) {
              case ('Atendimento'):
                this.atendimento++;
                break;
              case ('Desenvolvimento'):
                this.desenvolvimento++;
                break;
              case ('Aprovação'):
                this.aprovacao++;
                break;
              case ('Editoração'):
                this.editoracao++;
                break;
              case ('Conferência'):
                this.conferencia++;
                break;
              case ('Gravação'):
                this.gravacao++;
                break;
              case ('Expedição'):
                this.expedicao++;
                break;
            }
          }
          this.dataSource = new MatTableDataSource(data.results.reverse());
          this.dataSource.paginator = this.paginator;
          this.selection.clear();
          this.check = true;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
      });
  }

  count() {
    this.apiService.custom_objects_count('os', ['deleted', 'equal to', false])
      .subscribe((data: Count) => {
        if (data.error == null) {
          this.all = data.count;
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
      this.apiService.custom_objects_set_keys('os', selected[i]._id, { 'status': status })
        .subscribe((data) => {
          if (i == (selected.length - 1)) {
            this.list(['deleted', 'equal to', false]);
          }
        }, (data) => {
        });
    }
  }

  storage(id) {
    this.apiService.custom_objects_set_keys('os', id, { 'status': 'Arquivado' })
      .subscribe((data) => {
        this.list(['status', 'equal to', 'Expedição']);
      }, (data) => {
      });
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
    this.apiService.custom_objects_set_keys('os', id, { 'deleted': 'true' })
      .subscribe((data: Result_OS) => {
        this.session(data.error_code);
        this.list(['deleted', 'equal to', false]);
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
