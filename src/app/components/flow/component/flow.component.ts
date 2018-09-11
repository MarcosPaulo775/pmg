import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface Data {
  id: string;
  cliente: string,
  nome: string,
  data: string,
  acoes: string
}

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'id',
    'Cliente',
    'Nome do trabalho',
    'Data',
    'Ações'
  ];


  data: Data[] = [
    { id: 'string', cliente: 'strsdfsdfdsfsd fdsfsdfdsing', nome: 'string', data: 'string', acoes: 'string' },
    { id: 'string', cliente: 'string', nome: 'string', data: 'string', acoes: 'string' }
  ]

  dataSource: MatTableDataSource<Data>;
  selection = new SelectionModel<Data>(true, [])

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private production: ProductionComponent
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.production.title = 'Fluxo de serviço';
  }

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
