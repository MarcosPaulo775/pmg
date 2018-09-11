import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OsRoutingModule } from './os-routing.module';
import { OsComponent } from './component/os.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DetailsComponent } from './details/details.component';
import { OsService } from '../../core/http/os.service';

@NgModule({
  imports: [
    CommonModule,
    OsRoutingModule,
    SharedModule
  ],
  providers: [OsService],
  entryComponents: [DetailsComponent],
  declarations: [OsComponent, DetailsComponent],
})
export class OsModule { }