import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPresetComponent } from './component/new-preset.component';

const routes: Routes = [
  {
    path: '',
    component: NewPresetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPresetRoutingModule { }