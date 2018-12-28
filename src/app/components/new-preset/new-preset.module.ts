import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPresetRoutingModule } from './new-preset-routing.module';
import { NewPresetComponent } from './component/new-preset.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    NewPresetRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [NewPresetComponent],
})
export class NewPresetModule { }