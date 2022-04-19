import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPedidoPageRoutingModule } from './registro-pedido-routing.module';

import { RegistroPedidoPage } from './registro-pedido.page';
import { HeaderModalModule } from '../../header-modal/header-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroPedidoPageRoutingModule,
    HeaderModalModule
  ],
  declarations: [
    RegistroPedidoPage,
  
  ],
  providers:[
    CurrencyPipe
  ]
})
export class RegistroPedidoPageModule {}
