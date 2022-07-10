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
  solo_mora:boolean=false;
  sin_mora:boolean;
  contador:number=0;
 

  constructor(private pedidoService:PedidoService,
              private modalCtrl:ModalController,
              private routeAc: ActivatedRoute) { }

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
      entregado:'S',
      moraCancelado:'N'
      }
    const response:any = await this.pedidoService.getaCobrar();
    if(response.success){
      this.listaPedidos = response.data;
        for(let i=0;i<response.data.length;i++){
          for(let y=0;y<response.data[i].detalles.length;y++){
             if(response.data[i].detalles[y].cancelado == 'S' && response.data[i].detalles[y].moraCancelado == 'N'){
              this.solo_mora = true;
             }else{
              this.sin_mora = true;
             }
          }
        }
    
      }
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }
 async detalle(detalle:[],nombre:string,n_cuota:number,idPedido:number){
    const modal = await this.modalCtrl.create({
      component:CuoteroPage,
      componentProps:{
        detalle:detalle,
        nombre:nombre,
        idPedido:idPedido,
        n_cuota:n_cuota
      }
    });
   await modal.present();
  }
}
