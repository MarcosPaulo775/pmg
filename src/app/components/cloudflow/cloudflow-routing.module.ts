import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloudflowComponent } from './component/cloudflow.component';


const routes: Routes = [
  {
    path: '',
    component: CloudflowComponent,
    children: [
      {
        path: '',
        redirectTo: 'approval',
        pathMatch: 'full'
      },
      {
        path: 'approval',
        loadChildren: '../approval/approval.module#ApprovalModule'
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
export class CloudflowRoutingModule { }

