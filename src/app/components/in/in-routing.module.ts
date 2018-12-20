import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InComponent } from './component/in.component';

const routes: Routes = [
  {
    path: '',
    component: InComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InRoutingModule { }