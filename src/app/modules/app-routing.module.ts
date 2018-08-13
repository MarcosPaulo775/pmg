import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'production',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: '../components/login/login.module#LoginModule'
  },
  {
    path: 'user',
    loadChildren: '../components/user/user.module#UserModule'
  },
  {
    path: 'report',
    loadChildren: '../components/report/report.module#ReportModule'
  },
  {
    path: 'production',
    loadChildren: '../components/production/production.module#ProductionModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
