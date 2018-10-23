import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductionComponent } from './component/production.component';


const routes: Routes = [
  {
    path: '',
    component: ProductionComponent,
    children: [
      {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full'
      },
      {
        path: 'os',
        loadChildren: '../os/os.module#OsModule'
      },
      {
        path: 'jobs',
        loadChildren: '../jobs/jobs.module#JobsModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }

