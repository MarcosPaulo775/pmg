import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OsRoutingModule } from './os-routing.module';
import { OsComponent } from './component/os.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { ApiService } from '../../core/http/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    OsRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService],
  entryComponents: [],
  declarations: [OsComponent],
})
export class OsModule { }