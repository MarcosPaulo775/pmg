import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './component/storage.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    StorageRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [DialogComponent],
  declarations: [StorageComponent, DialogComponent],
})
export class StorageModule { }