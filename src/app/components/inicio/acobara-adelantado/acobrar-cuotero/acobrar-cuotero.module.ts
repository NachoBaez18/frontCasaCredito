import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcobrarCuoteroPageRoutingModule } from './acobrar-cuotero-routing.module';

import { AcobrarCuoteroPage } from './acobrar-cuotero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcobrarCuoteroPageRoutingModule
  ],
  declarations: [AcobrarCuoteroPage]
})
export class AcobrarCuoteroPageModule {}
