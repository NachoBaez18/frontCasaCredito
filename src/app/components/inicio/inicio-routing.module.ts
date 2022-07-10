import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcobaraAdelantadoComponent } from './acobara-adelantado/acobara-adelantado.component';
import { ACobrarComponent } from './acobrar/acobrar.component';
import { ArqueoComponent } from './arqueo/arqueo.component';
import { ClienteComponent } from './cliente/cliente.component';

import { InicioPage } from './inicio.page';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  {path:'', component:InicioPage,children:[
    {path:'cliente',component:ClienteComponent},
    {path:'pedido',component:PedidoComponent},
    {path:'aCobrar',component:ACobrarComponent},
    {path:'arqueo',component:ArqueoComponent},
    {path:'aCobrarAdelantado',component:AcobaraAdelantadoComponent},
  ]},
  {
    path: 'registro',
    loadChildren: () => import('./cliente/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro-pedido',
    loadChildren: () => import('./pedido/registro-pedido/registro-pedido.module').then( m => m.RegistroPedidoPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./acobrar/detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'detalle-arqueo',
    loadChildren: () => import('./arqueo/detalle-arqueo/detalle-arqueo.module').then( m => m.DetalleArqueoPageModule)
  },
  {
    path: 'acobrar-cuotero',
    loadChildren: () => import('./acobara-adelantado/acobrar-cuotero/acobrar-cuotero.module').then( m => m.AcobrarCuoteroPageModule)
  },
  {
    path: 'cuotero',
    loadChildren: () => import('./acobrar/cuotero/cuotero.module').then( m => m.CuoteroPageModule)
  },
  {
    path: 'mora-parcial',
    loadChildren: () => import('./acobrar/mora-parcial/mora-parcial.module').then( m => m.MoraParcialPageModule)
  },
  {
    path: 'fecha-edit',
    loadChildren: () => import('./acobrar/fecha-edit/fecha-edit.module').then( m => m.FechaEditPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
