import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnologyRoutingModule } from './technology-routing.module';
import { TechnologyComponent } from './component/technology.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DialogLineaturaComponent } from './dialogLineatura/dialog.component';
import { DialogMaterialComponent } from './dialogMaterial/dialog.component';
import { DialogVariationComponent } from './dialogVariation/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TechnologyRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [DialogLineaturaComponent, DialogMaterialComponent, DialogVariationComponent],
  declarations: [TechnologyComponent, DialogLineaturaComponent, DialogMaterialComponent, DialogVariationComponent],
})
export class TechnologyModule { }