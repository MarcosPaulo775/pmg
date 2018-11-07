import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from 'src/app/core/http/api.service';
import { Result_Company } from 'src/app/shared/models/api';
import { Company } from 'src/app/shared/models/company';
import {MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { CrmComponent } from '../../crm/component/crm.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private router: Router,
    private crmComponent: CrmComponent
  ) { }

  displayedColumns: string[] = ['razao', 'cnpj_cpf', 'button'];
  dataSource: MatTableDataSource<Company>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.list();
    this.crmComponent.title = 'Empresas';
    this.crmComponent.company = 'rgb(0, 90, 176)';
    this.crmComponent.dashboard = '';
  }

  onEdit() {

  }

  onDelete() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  list() {
    this.apiService.custom_objects_list('company', ['deleted', 'equal to', false], ' ')
      .subscribe((data: Result_Company) => {
        if (data.error == null) {
          //inserção de dados na tabela
          this.dataSource = new MatTableDataSource(data.results.reverse());
          this.dataSource.paginator = this.paginator;
        } else {
        }
      }, (data) => {
      });
  }

  onAdd() {
    if (localStorage.getItem('_id_company')) {
      localStorage.removeItem('_id_company');
    }
    this.router.navigate(['/crm/register']);
  }

}
