import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: 'production',
    loadChildren: './components/production/production.module#ProductionModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'config',
    loadChildren: './components/config/config.module#ConfigModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'crm',
    loadChildren: './components/crm/crm.module#CrmModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'stock',
    loadChildren: './components/stock/stock.module#StockModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
