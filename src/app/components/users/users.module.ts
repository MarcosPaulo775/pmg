import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './component/users.component';

import { SharedModule } from '../../shared/modules/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogPassComponent } from './dialogPass/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [],
  entryComponents: [DialogComponent, DialogPassComponent],
  declarations: [UsersComponent, DialogComponent, DialogPassComponent],
})
export class UsersModule { }