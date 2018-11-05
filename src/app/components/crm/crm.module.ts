import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './component/crm.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { JobsService } from '../../core/http/jobs.service';

@NgModule({
  imports: [
    CommonModule,
    CrmRoutingModule,
    SharedModule
  ],
  providers: [JobsService],
  entryComponents: [],
  declarations: [CrmComponent],
})
export class CrmModule { }