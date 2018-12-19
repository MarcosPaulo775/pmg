import { Component, OnInit } from '@angular/core';
import { ProductionComponent } from '../../production/component/production.component';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(
    private production: ProductionComponent,
  ) { }

  ngOnInit() {
    this.production.title = 'Seguência de impressão';
    this.production.dashboard = '';
    this.production.print = 'rgb(0, 90, 176)';
    this.production.jobs = '';
    this.production.storage = '';
  }

}
