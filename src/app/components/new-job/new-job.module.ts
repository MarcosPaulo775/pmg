import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewJobRoutingModule } from './new-job-routing.module';
import { NewJobComponent } from './component/new-job.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DialogColorComponent } from './dialogColor/dialog.component';
import { DialogProvaComponent } from './dialogProva/dialog.component';
import { DialogFinanceiroComponent } from './dialogFinanceiro/dialog.component';
import { DialogMedidasComponent } from './dialogMedidas/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    NewJobRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [DialogColorComponent, DialogProvaComponent, DialogFinanceiroComponent, DialogMedidasComponent],
  declarations: [NewJobComponent, DialogColorComponent, DialogProvaComponent, DialogFinanceiroComponent, DialogMedidasComponent],
})
export class NewJobModule { }