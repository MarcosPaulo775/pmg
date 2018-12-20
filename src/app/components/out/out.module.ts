import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutRoutingModule } from './out-routing.module';
import { OutComponent } from './component/out.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OutRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [OutComponent],
})
export class OutModule { }