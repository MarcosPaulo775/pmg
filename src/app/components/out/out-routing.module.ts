import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutComponent } from './component/out.component';

const routes: Routes = [
  {
    path: '',
    component: OutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutRoutingModule { }