import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioPageRoutingModule } from './inicio-routing.module';

//componentes
import { InicioPage } from './inicio.page';
import {ClienteComponent} from './cliente/cliente.component';
import {PedidoComponent} from './pedido/pedido.component';
import {MenuComponent} from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RegistroPage } from './cliente/registro/registro.page';
import { RegistroPageModule } from './cliente/registro/registro.module';
import { ACobrarComponent } from './acobrar/acobrar.component';
import { ArqueoComponent } from './arqueo/arqueo.component';
import { AcobaraAdelantadoComponent } from './acobara-adelantado/acobara-adelantado.component';



@NgModule({
    exports: [],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InicioPageRoutingModule,
        PipesModule,
        RegistroPageModule,
    ],
    declarations: [
        InicioPage,
        ClienteComponent,
        PedidoComponent,
        MenuComponent,
        HeaderComponent,
        ACobrarComponent,
        AcobaraAdelantadoComponent,
        ArqueoComponent,
    ]
})
export class InicioPageModule {}
