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
        path: 'new-company',
        loadChildren: '../new-company/new-company.module#NewCompanyModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }