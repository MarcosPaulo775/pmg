import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './component/register.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { ApiService } from 'src/app/core/http/api.service';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  ],
  providers: [ApiService],
  entryComponents: [],
  declarations: [RegisterComponent],
})
export class RegisterModule { }