import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../../stock/component/stock.component';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.css']
})
export class InComponent implements OnInit {

  constructor(
    private stockComponent: StockComponent
  ) { }

  ngOnInit() {
    this.stockComponent.title = 'Entrada';
    this.stockComponent.dashboard = '';
    this.stockComponent.setIn = 'rgb(0, 90, 176)';
    this.stockComponent.setOut = '';
  }

}
