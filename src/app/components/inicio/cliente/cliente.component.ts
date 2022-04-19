import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Cliente } from 'src/app/moldels/cliente';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { RegistroPedidoPage } from '../pedido/registro-pedido/registro-pedido.page';
import { RegistroPage } from './registro/registro.page';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {

  listaClientes:Cliente[]=[];
  textoBuscar = '';
  parametro:{} = {}

  constructor(private clienteService:ClienteService,
              private modalCtrl:ModalController,
              private alertService:AlertService)  { }

  ngOnInit() {
    this.getClientes();
  }

  async getClientes(){
    this.parametro={
      activo:'S'
    }
    const response:any = await this.clienteService.get(null,this.parametro);
    this.listaClientes = response.data;
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  async AbrirRegistro(valor:boolean,cliente:Cliente,detalle:boolean){
    const modal = await this.modalCtrl.create({
       component:RegistroPage,
       componentProps:{
         accion:valor,
         cliente:cliente,
         detalle:detalle
       }
     });
    await modal.present();
   }

   doRefresh(event){
    setTimeout(() => {
      this.getClientes();
      event.target.complete();
    }, 1500);
   }

   async editar(valor:boolean,cliente:Cliente,detalle:boolean){
        this.AbrirRegistro(valor,cliente,detalle);
   }

   borrar(cliente:any){
    const response:any = this.clienteService.anular(cliente.id);
    if(response){
      this.alertService.informativo('Cliente eliminado');
    }
   }

   detalle(valor:boolean,cliente:Cliente,detalle:boolean){
    this.AbrirRegistro(valor,cliente,detalle);
   }

  async irPedido(valor:boolean,cliente:Cliente,detalle:boolean,vCliente:boolean){
    const modal = await this.modalCtrl.create({
      component:RegistroPedidoPage,
      componentProps:{
        accion:valor,
        cliente:cliente,
        detalle:detalle,
        vCliente:vCliente
      }
    });
   await modal.present();
  }
   
}
