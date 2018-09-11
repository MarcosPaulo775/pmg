import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './component/jobs.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { JobsService } from '../../core/http/jobs.service';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule
  ],
  providers: [JobsService],
  entryComponents: [DialogComponent],
  declarations: [JobsComponent, DialogComponent],
})
export class JobsModule { }