import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrmComponent } from './component/crm.component';


const routes: Routes = [
  {
    path: '',
    component: CrmComponent,
    children: [
      {
        path: '',
        redirectTo: 'companies',
        pathMatch: 'full'
      },
      {
        path: 'companies',
        loadChildren: '../companies/companies.module#CompaniesModule'
      },
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }