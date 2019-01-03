import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicRoutingModule } from './graphic-routing.module';
import { GraphicComponent } from './component/graphic.component';

import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    GraphicRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [GraphicComponent],
})
export class GraphicModule { }