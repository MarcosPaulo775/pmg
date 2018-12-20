import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './component/user.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DialogAvatarComponent } from './dialogAvatar/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [DialogAvatarComponent],
  declarations: [UserComponent, DialogAvatarComponent],
})
export class UserModule { }