import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleArqueoPageRoutingModule } from './detalle-arqueo-routing.module';

import { DetalleArqueoPage } from './detalle-arqueo.page';
import { HeaderModalModule } from '../../header-modal/header-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DetalleArqueoPageRoutingModule,
    HeaderModalModule
  ],
  declarations: [DetalleArqueoPage]
})
export class DetalleArqueoPageModule {}
