import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './component/report.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule,
    ChartsModule,
    SharedModule
  ],
  providers: [],
  declarations: [ReportComponent],
})
export class ReportModule { }
