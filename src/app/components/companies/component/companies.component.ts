import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';

import { ApiService } from 'src/app/core/http/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogConfirmComponent } from '../../confirm/confirm.component';
import { CrmComponent } from '../../crm/component/crm.component';
import { Result_Company } from 'src/app/shared/models/api';
import { Company } from 'src/app/shared/models/company';
import { AppService } from 'src/app/shared/Services/app.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(
    private router: Router,

    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    private apiService: ApiService,
    private appService: AppService,
    private crmComponent: CrmComponent,
  ) { }

  /** Define as colunas da tabela*/
  displayedColumns: string[] = ['razao', 'cnpj_cpf', 'button'];

  /** Define os tipo de dado da tabela */
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** Filtro da tabela */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    //Lista todos os itens menos os que estão marcados como deletados
    this.list(['deleted', 'equal to', false]);

    //Muda o Título do component pai
    this.crmComponent.title = 'Empresas';

    //muda a cor dos botoes do component pai
    this.crmComponent.company = 'rgb(0, 90, 176)';
    this.crmComponent.dashboard = '';
  }

  /** Guarda o id da empresa no localstorage e muda a pagina para a de edição */
  onEdit(id: string) {
    if (id) {
      localStorage.setItem('_id_company', id);
      this.router.navigate(['/crm/register']);
    }
  }

  /** Marca a empresa como deletada */
  onDelete(id: string) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, { data: 'Deseja realmente excluir?' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.custom_objects_set_keys('company', id, { 'deleted': true })
          .subscribe((data: Result_Company) => {
            if (!data.error) {
              this.list(['deleted', 'equal to', false]);
              this.appService.openSnackBar('Empresa deletada', 'ok');
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

  /** Abre a caixa de diálogo para visualizar os detalhes */
  openDialog(company: Company): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100vw',
      data: company
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'load') {
        this.list(['deleted', 'equal to', false]);
      }
    });
  }

  /** Busca os itens para preencher a tabela */
  list(query) {
    this.apiService.custom_objects_list('company', query, ' ')
      .subscribe((data: Result_Company) => {
        if (!data.error) {
          //inserção de dados na tabela
          this.dataSource = new MatTableDataSource(data.results);
          this.dataSource.paginator = this.paginator;
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        this.appService.openSnackBar('Erro comunicar com o servidor', 'ok');
        console.log(data);
      });
  }

  /** Remove o id da empresa e muda a página para adicionar empresa */
  onAdd() {
    if (localStorage.getItem('_id_company')) {
      localStorage.removeItem('_id_company');
    }
    this.router.navigate(['/crm/register']);
  }

}
