import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './component/production.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductionRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [ProductionComponent],
})
export class ProductionModule { }