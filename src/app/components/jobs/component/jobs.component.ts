import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProductionComponent } from '../../production/component/production.component';
import { SelectionModel } from '@angular/cdk/collections';
import { JobsService } from '../../../core/http/jobs.service';
import { Result_OS } from '../../../shared/models/api';
import { Os } from '../../../shared/models/os';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {

  animal: string;
  name: string;

  displayedColumns: string[] = [
    'select',
    'id',
    'Cliente',
    'Nome do trabalho',
    'Status',
    'Ações'
  ];

  dataSource: MatTableDataSource<Os>;
  selection = new SelectionModel<Os>(true, [])

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private production: ProductionComponent,
    private jobsService: JobsService,
    public dialog: MatDialog
  ) {
    // Assign the data to the data source for the table to render
  }

  openDialog(os: Os): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px',
      data: os
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  
  ngOnInit() {
    this.list();
    this.production.title = 'Trabalhos';
  }

  list() {
    this.jobsService.custom_objects_list()
      .subscribe((data: Result_OS) => {
        if (data.error == null) {
          this.dataSource = new MatTableDataSource(data.results);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
        }
        console.log(data);
      }, (data) => {
      });
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
    console.log(this.dataSource.data.toString());
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
      console.log(this.dataSource.data.values());
  }

}


