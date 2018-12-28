import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresetRoutingModule } from './preset-routing.module';
import { PresetComponent } from './component/preset.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    PresetRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [ DialogComponent],
  declarations: [PresetComponent,  DialogComponent],
})
export class PresetModule { }