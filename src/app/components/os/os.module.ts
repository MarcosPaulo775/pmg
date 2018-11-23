import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OsRoutingModule } from './os-routing.module';
import { OsComponent } from './component/os.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { ApiService } from '../../core/http/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogColorComponent } from './dialogColor/dialog.component';
import { DialogProvaComponent } from './dialogProva/dialog.component';
import { DialogFinanceiroComponent } from './dialogFinanceiro/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    OsRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService],
  entryComponents: [DialogColorComponent, DialogProvaComponent, DialogFinanceiroComponent],
  declarations: [OsComponent, DialogColorComponent, DialogProvaComponent, DialogFinanceiroComponent],
})
export class OsModule { }