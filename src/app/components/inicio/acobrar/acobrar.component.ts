import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Pedido } from 'src/app/moldels/pedido';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { environment } from 'src/environments/environment';
import { CuoteroPage } from './cuotero/cuotero.page';
import { DetallePage } from './detalle/detalle.page';

@Component({
  selector: 'app-acobrar',
  templateUrl: './acobrar.component.html',
  styleUrls: ['./acobrar.component.scss'],
})
export class ACobrarComponent implements OnInit {

  textoBuscar = '';
  listaPedidos:Pedido[] =[];
  listaDetalle:Pedido[]=[];
  idDetalle:number;
  parametro ={};
  pedidosOrden = {};
  fechaHoy = moment();
  public header:boolean;

  constructor(private pedidoService:PedidoService,
              private modalCtrl:ModalController,
              private alertService:AlertService,
              private route:Router,)
               { }

  ngOnInit() {
    this.getPedidos();
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
    const response:any = await this.pedidoService.getaCobrarHoy();
    if(response.success){
     this.listaPedidos =  response.data;
     console.log(this.listaPedidos);
      }
  }

  async reorder(event) {

    const itemMover = this.listaPedidos.splice(event.detail.from, 1)[0];
    this.listaPedidos.splice(event.detail.to, 0, itemMover);
    event.detail.complete();

    this.pedidosOrden={
      pedidos:this.listaPedidos
    }
    console.log(this.pedidosOrden);
    const response:any = await this.pedidoService.orden(this.pedidosOrden); 
  }
  buscar(event){
    this.textoBuscar = event.detail.value;
  }
 

 async  detalle(detalle:[],nombre:string,n_cuota:number){
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

   imprimirCobros(){
    window.open(`${environment.api}/pedido/aCobrarPdf`, '_blank');
   }
}
