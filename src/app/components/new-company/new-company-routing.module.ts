import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCompanyComponent } from './component/new-company.component';

const routes: Routes = [
  {
    path: '',
    component: NewCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCompanyRoutingModule { }