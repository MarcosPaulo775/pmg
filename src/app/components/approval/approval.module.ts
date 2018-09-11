import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './component/approval.component';

import { SharedModule } from '../../shared/modules/shared.module';

import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from '../../core/http/upload.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [UploadService],
  entryComponents: [DialogComponent],
  declarations: [ApprovalComponent, DialogComponent],
})
export class ApprovalModule { }