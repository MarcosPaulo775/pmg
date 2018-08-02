import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
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
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
