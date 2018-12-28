import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewCompanyRoutingModule } from './new-company-routing.module';
import { NewCompanyComponent } from './component/new-company.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NewCompanyRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [NewCompanyComponent],
})
export class NewCompanyModule { }