import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './component/users.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { ApiService } from 'src/app/core/http/api.service';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ApiService],
  entryComponents: [],
  declarations: [UsersComponent],
})
export class UsersModule { }