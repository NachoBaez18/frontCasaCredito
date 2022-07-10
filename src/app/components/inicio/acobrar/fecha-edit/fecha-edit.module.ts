import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FechaEditPageRoutingModule } from './fecha-edit-routing.module';

import { FechaEditPage } from './fecha-edit.page';
import { HeaderModalModule } from '../../header-modal/header-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FechaEditPageRoutingModule,
    HeaderModalModule,
    ReactiveFormsModule
  ],
  declarations: [FechaEditPage]
})
export class FechaEditPageModule {}
