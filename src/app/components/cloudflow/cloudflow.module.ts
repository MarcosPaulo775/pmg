import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloudflowRoutingModule } from './cloudflow-routing.module';
import { CloudflowComponent } from './component/cloudflow.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CloudflowRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [CloudflowComponent],
})
export class CloudflowModule { }