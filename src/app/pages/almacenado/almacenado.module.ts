import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlmacenadoPageRoutingModule } from './almacenado-routing.module';

import { AlmacenadoPage } from './almacenado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlmacenadoPageRoutingModule
  ],
  declarations: [AlmacenadoPage]
})
export class AlmacenadoPageModule {}
