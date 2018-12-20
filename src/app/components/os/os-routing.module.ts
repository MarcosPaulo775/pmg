import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OsComponent } from './component/os.component';

const routes: Routes = [
  {
    path: '',
    component: OsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OsRoutingModule { }