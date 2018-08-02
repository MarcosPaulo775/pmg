import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportRoutingModule } from './report-routing.module';

import { ReportComponent } from './component/report.component';
import { MaterialModule } from '../../modules/material';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  declarations: [ReportComponent],
})
export class ReportModule { }
