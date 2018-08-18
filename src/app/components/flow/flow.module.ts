import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowRoutingModule } from './flow-routing.module';
import { FlowComponent } from './component/flow.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FlowRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [FlowComponent],
})
export class FlowModule { }