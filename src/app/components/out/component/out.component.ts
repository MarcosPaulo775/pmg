import { Component, OnInit } from '@angular/core';
import { StockComponent } from '../../stock/component/stock.component';

@Component({
  selector: 'app-out',
  templateUrl: './out.component.html',
  styleUrls: ['./out.component.css']
})
export class OutComponent implements OnInit {

  constructor(
    private stockComponent: StockComponent
  ) { }

  ngOnInit() {
    this.stockComponent.title = 'Saída';
    this.stockComponent.dashboard = '';
    this.stockComponent.setIn = '';
    this.stockComponent.setOut = 'rgb(0, 90, 176)';
  }

}
