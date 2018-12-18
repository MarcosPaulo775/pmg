import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './component/storage.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { ApiService } from '../../core/http/api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    StorageRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [ApiService],
  entryComponents: [],
  declarations: [StorageComponent],
})
export class StorageModule { }