import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user-list/user.component';
import { MaterialModule } from '../../material';

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