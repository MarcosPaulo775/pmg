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
      },
      {
        path: 'print',
        loadChildren: '../print/print.module#PrintModule'
      },
      {
        path: 'storage',
        loadChildren: '../storage/storage.module#StorageModule'
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

