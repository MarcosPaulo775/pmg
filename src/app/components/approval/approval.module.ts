import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './component/approval.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [ApprovalComponent],
})
export class ApprovalModule { }