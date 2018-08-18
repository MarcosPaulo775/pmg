import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OsRoutingModule } from './os-routing.module';
import { OsComponent } from './component/os.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OsRoutingModule,
    SharedModule
  ],
  providers: [],
  declarations: [OsComponent],
})
export class OsModule { }