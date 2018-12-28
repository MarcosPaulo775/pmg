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
        path: 'new-job',
        loadChildren: '../new-job/new-job.module#NewJobModule'
      },
      {
        path: 'jobs',
        loadChildren: '../jobs/jobs.module#JobsModule'
      },
      {
        path: 'storage',
        loadChildren: '../storage/storage.module#StorageModule'
      },
      {
        path: 'preset',
        loadChildren: '../preset/preset.module#PresetModule'
      },
      {
        path: 'new-preset',
        loadChildren: '../new-preset/new-preset.module#NewPresetModule'
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

