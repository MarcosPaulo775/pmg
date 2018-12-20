import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './component/stock.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [StockComponent],
})
export class StockModule { }