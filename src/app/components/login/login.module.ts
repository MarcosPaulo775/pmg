import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login-list/login.component';
import { MaterialModule } from '../../material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ],
  providers: [],
  declarations: [LoginComponent],
})
export class LoginModule { }