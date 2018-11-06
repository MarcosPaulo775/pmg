import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './component/companies.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from 'src/app/core/http/api.service';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    SharedModule
  ],
  providers: [ApiService],
  entryComponents: [DialogComponent],
  declarations: [CompaniesComponent, DialogComponent],
})
export class CompaniesModule { }