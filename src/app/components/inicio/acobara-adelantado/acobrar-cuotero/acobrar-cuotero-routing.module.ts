import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcobrarCuoteroPage } from './acobrar-cuotero.page';

const routes: Routes = [
  {
    path: '',
    component: AcobrarCuoteroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcobrarCuoteroPageRoutingModule {}
