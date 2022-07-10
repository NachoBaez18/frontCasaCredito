import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoraParcialPageRoutingModule } from './mora-parcial-routing.module';

import { MoraParcialPage } from './mora-parcial.page';
import { HeaderModalModule } from '../../header-modal/header-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoraParcialPageRoutingModule,
    HeaderModalModule,
    ReactiveFormsModule
  ],
  declarations: [MoraParcialPage]
})
export class MoraParcialPageModule {}
