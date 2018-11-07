import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { PrintComponent } from './component/print.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    PrintRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [PrintComponent],
})
export class PrintModule { }