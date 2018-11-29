import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './component/user.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { ApiService } from 'src/app/core/http/api.service';
import { NgxMaskModule } from 'ngx-mask'
import { DialogAvatarComponent } from './dialogAvatar/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ApiService],
  entryComponents: [DialogAvatarComponent],
  declarations: [UserComponent, DialogAvatarComponent],
})
export class UserModule { }