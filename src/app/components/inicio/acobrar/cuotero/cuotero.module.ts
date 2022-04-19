import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuoteroPageRoutingModule } from './cuotero-routing.module';

import { CuoteroPage } from './cuotero.page';
import { HeaderModalComponent } from '../../header-modal/header-modal.component';
import { HeaderModalModule } from '../../header-modal/header-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuoteroPageRoutingModule,
    HeaderModalModule
  ],
  declarations: [CuoteroPage]
})
export class CuoteroPageModule {}
