import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../app/servicios/usuario.service';
import { ClienteService } from '../app/servicios/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { PedidoService } from './servicios/pedido.service';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        PipesModule,
    ],
    providers: [
        UsuarioService,
        ClienteService,
        PedidoService,
        { provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
