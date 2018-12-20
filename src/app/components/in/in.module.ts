import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InRoutingModule } from './in-routing.module';
import { InComponent } from './component/in.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [InComponent],
})
export class InModule { }