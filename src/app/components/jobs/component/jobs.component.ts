import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';

import { ApiService } from '../../../core/http/api.service';
import { ProductionComponent } from '../../production/component/production.component';
import { DialogComponent } from '../dialog/dialog.component';
import { Result_OS, Count } from '../../../shared/models/api';
import { OS } from '../../../shared/models/os';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {

  /** Colunas da tabela */
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

  /** Numero de OS em cada etapa */
  all: number;
  atendimento: number;
  desenvolvimento: number;
  aprovacao: number;
  editoracao: number;
  conferencia: number;
  gravacao: number;
  expedicao: number;
  status: string;

  /** Cor dos botoes das etapas */
  all_s: string;
  atendimento_s: string;
  desenvolvimento_s: string;
  aprovacao_s: string;
  editoracao_s: string;
  conferencia_s: string;
  gravacao_s: string;
  expedicao_s: string;

  /** Indica quando o botão de arquivar OS deve aparecer */
  check: boolean;

  /** Indica o tipo de dados da tabela */
  dataSource: MatTableDataSource<OS>;

  /**Criar uma variavel para a seleção da tabela */
  selection = new SelectionModel<OS>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,

    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    private apiService: ApiService,
    private production: ProductionComponent
  ) { }

  ngOnInit() {
    this.list(['deleted', 'equal to', false, 'and', 'status', 'not equal to', 'Arquivado']);
    this.production.title = 'Trabalhos';
    this.production.dashboard = '';
    this.production.print = '';
    this.production.jobs = 'rgb(0, 90, 176)';
    this.production.storage = '';

    this.atendimento_s = '';
    this.desenvolvimento_s = '';
    this.aprovacao_s = '';
    this.editoracao_s = '';
    this.conferencia_s = '';
    this.gravacao_s = '';
    this.expedicao_s = '';
    this.all_s = 'rgb(0, 90, 176)';
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
        this.openSnackBar('Erro ao comunicar com servidor', 'ok');
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

          this.atendimento = 0;
          this.desenvolvimento = 0;
          this.aprovacao = 0;
          this.editoracao = 0;
          this.conferencia = 0;
          this.gravacao = 0;
          this.expedicao = 0;

          //faz a contagem de OS em cada etapa
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

          //inserção de dados na tabela
          this.dataSource = new MatTableDataSource(data.results.reverse());
          this.dataSource.paginator = this.paginator;
          this.selection.clear();
          this.check = true;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao comunicar com servidor', 'ok');
        console.log(data);
      });
  }

  /** Muda a tabela de acordo com a seleção */
  onFlow(query: string) {

    //Apaga o botão de arquivar
    this.check = false;

    if (query == 'all') {

      //Lista todas as OS exeto as excluidas ou arquivadas
      this.list(['deleted', 'equal to', false, 'and', 'status', 'not equal to', 'Arquivado']);
      this.atendimento_s = '';
      this.desenvolvimento_s = '';
      this.aprovacao_s = '';
      this.editoracao_s = '';
      this.conferencia_s = '';
      this.gravacao_s = '';
      this.expedicao_s = '';
      this.all_s = 'rgb(0, 90, 176)';
    } else {

      //Muda a tabela de acordo com a seleção
      this.list(['status', 'equal to', query, 'and', 'deleted', 'equal to', false]);

      //Muda a cor dos botoes de acordo com a seleção
      switch (query) {
        case ('Atendimento'):
          this.atendimento_s = 'rgb(0, 90, 176)';
          this.desenvolvimento_s = '';
          this.aprovacao_s = '';
          this.editoracao_s = '';
          this.conferencia_s = '';
          this.gravacao_s = '';
          this.expedicao_s = '';
          this.all_s = '';
          break;
        case ('Desenvolvimento'):
          this.desenvolvimento_s = 'rgb(0, 90, 176)';
          this.atendimento_s = '';
          this.aprovacao_s = '';
          this.editoracao_s = '';
          this.conferencia_s = '';
          this.gravacao_s = '';
          this.expedicao_s = '';
          this.all_s = '';
          break;
        case ('Aprovação'):
          this.aprovacao_s = 'rgb(0, 90, 176)';
          this.atendimento_s = '';
          this.desenvolvimento_s = '';
          this.editoracao_s = '';
          this.conferencia_s = '';
          this.gravacao_s = '';
          this.expedicao_s = '';
          this.all_s = '';
          break;
        case ('Editoração'):
          this.editoracao_s = 'rgb(0, 90, 176)';
          this.atendimento_s = '';
          this.desenvolvimento_s = '';
          this.aprovacao_s = '';
          this.conferencia_s = '';
          this.gravacao_s = '';
          this.expedicao_s = '';
          this.all_s = '';
          break;
        case ('Conferência'):
          this.conferencia_s = 'rgb(0, 90, 176)';
          this.atendimento_s = '';
          this.desenvolvimento_s = '';
          this.aprovacao_s = '';
          this.editoracao_s = '';
          this.gravacao_s = '';
          this.expedicao_s = '';
          this.all_s = '';
          break;
        case ('Gravação'):
          this.gravacao_s = 'rgb(0, 90, 176)';
          this.atendimento_s = '';
          this.desenvolvimento_s = '';
          this.aprovacao_s = '';
          this.editoracao_s = '';
          this.conferencia_s = '';
          this.expedicao_s = '';
          this.all_s = '';
          break;
        case ('Expedição'):
          this.expedicao_s = 'rgb(0, 90, 176)';
          this.atendimento_s = '';
          this.desenvolvimento_s = '';
          this.aprovacao_s = '';
          this.editoracao_s = '';
          this.conferencia_s = '';
          this.gravacao_s = '';
          this.all_s = '';
          break;
      }
    }
  }

  /** Conta todas as OS exeto as exclidas ou arquivadas */
  count() {
    this.apiService.custom_objects_count('os', ['deleted', 'equal to', false, 'and', 'status', 'not equal to', 'Arquivado'])
      .subscribe((data: Count) => {
        if (!data.error) {
          this.all = data.count;
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao comunicar com servidor', 'ok');
        console.log(data);
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
          console.log(data);
        });
    }
  }

  /** Arquiva a OS */
  storage(id) {
    this.apiService.custom_objects_set_keys('os', id, { 'status': 'Arquivado' })
      .subscribe((data: OS) => {
        if (!data.error) {
          this.list(['status', 'equal to', 'Expedição']);
          this.openSnackBar('Ordem de serviço arquivada', 'ok');
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao comunicar com servidor', 'ok');
        console.log(data);
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
        if (!data.error) {
          this.list(['deleted', 'equal to', false]);
          this.openSnackBar('Ordem de serviço deletada', 'ok');
        } else {
          this.session(data.error_code);
        }
      }, (data) => {
        this.openSnackBar('Erro ao comunicar com servidor', 'ok');
        console.log(data);
      });
  }

  /** Edita a ordem de serviço */
  onEdit(id: string) {
    if (id) {
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

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}


