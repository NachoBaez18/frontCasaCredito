import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Pedido } from 'src/app/moldels/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { CuoteroPage } from '../acobrar/cuotero/cuotero.page';

@Component({
  selector: 'app-acobara-adelantado',
  templateUrl: './acobara-adelantado.component.html',
  styleUrls: ['./acobara-adelantado.component.scss'],
})
export class AcobaraAdelantadoComponent implements OnInit {

  textoBuscar = '';
  listaPedidos:Pedido[]=[];
  listaDetalle:[]=[];
  idDetalle:number;
  parametro ={};
  x:boolean;

  constructor(private pedidoService:PedidoService,
              private modalCtrl:ModalController) { }

  ngOnInit() {
    this.getPedidos()
 
  }

  doRefresh(event){
    setTimeout(() => {
      this.getPedidos();
      event.target.complete();
    }, 1500);
   }

   async getPedidos(){
    
    this.parametro={
      cancelado:'N',
      entregado:'S'
      }
    const response:any = await this.pedidoService.getaCobrar();
    if(response.success){
      this.listaPedidos = response.data;
      }
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }
 async detalle(detalle:[],nombre:string,n_cuota:number){
    const modal = await this.modalCtrl.create({
      component:CuoteroPage,
      componentProps:{
        detalle:detalle,
        nombre:nombre,
        n_cuota:n_cuota
      }
    });
   await modal.present();
  }
}
