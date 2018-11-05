import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './component/config.component';


const routes: Routes = [
  {
    path: '',
    component: ConfigComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
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
export class ConfigRoutingModule { }

