import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowRoutingModule } from './flow-routing.module';

import { FlowComponent } from './component/flow.component';
import { MaterialModule } from '../../modules/material';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlowRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  declarations: [FlowComponent],
})
export class FlowModule { }