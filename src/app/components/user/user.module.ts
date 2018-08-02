import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './component/user.component';
import { MaterialModule } from '../../modules/material';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ],
  providers: [],
  declarations: [UserComponent],
})
export class UserModule { }