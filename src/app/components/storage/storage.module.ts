import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './component/storage.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { ApiService } from '../../core/http/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from '../storage/dialog/dialog.component';


@NgModule({
  imports: [
    CommonModule,
    StorageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService],
  entryComponents: [DialogComponent],
  declarations: [StorageComponent, DialogComponent],
})
export class StorageModule { }