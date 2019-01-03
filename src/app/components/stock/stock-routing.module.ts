import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockComponent } from './component/stock.component';


const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    children: [
      {
        path: '',
        redirectTo: 'graphic',
        pathMatch: 'full'
      },
      {
        path: 'in',
        loadChildren: '../in/in.module#InModule'
      },
      {
        path: 'out',
        loadChildren: '../out/out.module#OutModule'
      },
      {
        path: 'graphic',
        loadChildren: '../graphic/graphic.module#GraphicModule'
      },
      {
        path: 'technology',
        loadChildren: '../technology/technology.module#TechnologyModule'
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
export class StockRoutingModule { }

