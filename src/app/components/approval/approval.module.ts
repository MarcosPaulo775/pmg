import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './component/approval.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [DialogComponent],
  declarations: [ApprovalComponent, DialogComponent],
})
export class ApprovalModule { }