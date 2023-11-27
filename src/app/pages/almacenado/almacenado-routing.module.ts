import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlmacenadoPage } from './almacenado.page';

const routes: Routes = [
  {
    path: '',
    component: AlmacenadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlmacenadoPageRoutingModule {}
