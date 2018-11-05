import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './component/dashboard.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { JobsService } from '../../core/http/jobs.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [JobsService],
  entryComponents: [],
  declarations: [DashboardComponent],
})
export class DashboardModule { }