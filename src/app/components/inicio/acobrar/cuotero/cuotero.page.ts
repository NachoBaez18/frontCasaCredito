import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { DetallePage } from '../detalle/detalle.page';
import { FechaEditPage } from '../fecha-edit/fecha-edit.page';
import { MoraParcialPage } from '../mora-parcial/mora-parcial.page';

@Component({
  selector: 'app-cuotero',
  templateUrl: './cuotero.page.html',
  styleUrls: ['./cuotero.page.scss'],
})
export class CuoteroPage implements OnInit {
  @Input() detalle:any;
  @Input() nombre:string;
  @Input() n_cuota:number;
  @Input() idPedido:number;
  parametro = {};
  x:boolean;

  constructor(private pedidoService:PedidoService,
              private alertService:AlertService,
              private route:Router,
              private modalCtrl:ModalController,
              private routeAc:ActivatedRoute) { }

  ngOnInit() {

    this.routeAc.queryParams.subscribe((params: any) => {
      this.x = (params.data === "true");
    });;
  }

  async CambiarFecha(){
    const modal = await this.modalCtrl.create({
      component:FechaEditPage,
      componentProps:{
        idPedido:this.idPedido,
        nombre:this.nombre
      }
    });
   await modal.present();

  }



  async pagadoParcial(detalle:any){   
   
      this.parametro = {
       id_pedido:detalle.id_pedido,
       fecha_vencimiento:detalle.fecha_vencimiento, 
       monto:detalle.monto,
       cuota_numero:detalle.cuota_numero,
       cancelado:'S',
       mora:detalle.mora,
       moraDias:detalle.moraDias,
       moraCancelado:detalle.cancelado
     }
    const response:any = await this.pedidoService.pagadoParcial(this.parametro,detalle.id);
    if(response.success){
      this.alertService.informativo('Cuota pagada parcialmente');
      this.modalCtrl.dismiss();
      
    }else{
      this.alertService.informativo(response.message);
      this.modalCtrl.dismiss();
      this.route.navigate(['inicio/arqueo']);
    }
  }

  async pagadoTotal(detalle:any){

    if(detalle.cancelado === 'S' && detalle.moraCancelado ==='N'){

      this.parametro = {
        id_pedido:detalle.id_pedido,
        fecha_vencimiento:detalle.fecha_vencimiento, 
        monto:0,
        cuota_numero:detalle.cuota_numero,
        cancelado:'S',
        mora:detalle.mora,
        moraDias:detalle.moraDias,
        moraCancelado:'S'
      }
    }else{
      this.parametro = {
        id_pedido:detalle.id_pedido,
        fecha_vencimiento:detalle.fecha_vencimiento, 
        monto:detalle.monto,
        cuota_numero:detalle.cuota_numero,
        cancelado:'S',
        mora:detalle.mora,
        moraDias:detalle.moraDias,
        moraCancelado:'S'
      }

    }
    
    const response:any = await this.pedidoService.pagadoTotal(this.parametro,detalle.id);
    if(response.success){
      this.alertService.informativo('Cuota Cancelada');
      this.modalCtrl.dismiss();
    }else{
      this.alertService.informativo(response.message);
      this.modalCtrl.dismiss();
      this.route.navigate(['inicio/arqueo']);
    }
  }

  async noPagado(detalle:any){
    
       let fechaNueva = moment(detalle.fechaVencimiento).add(1,'days')

       if (detalle.mora >= 30000){
        this.parametro = {
          id_pedido:detalle.id_pedido,
          fecha_vencimiento:fechaNueva.format('YYYY-MM-DD'), 
          monto:detalle.monto,
          cuota_numero:detalle.cuota_numero,
          cancelado:detalle.cancelado,
          mora:detalle.mora,
          moraDias:detalle.moraDias + 1,
          moraCancelado:'N'
        }
       }else{
        this.parametro = {
          id_pedido:detalle.id_pedido,
          fecha_vencimiento:fechaNueva.format('YYYY-MM-DD'), 
          monto:detalle.monto,
          cuota_numero:detalle.cuota_numero,
          cancelado:detalle.cancelado,
          mora:detalle.mora + 5000,
          moraDias:detalle.moraDias + 1,
          moraCancelado:'N'
        }
       }
     
     const response:any = await this.pedidoService.noPagado(this.parametro,detalle.id);
     if(response.success){
       this.alertService.informativo('Cuota no pagada');
       this.modalCtrl.dismiss();
     }else{
      this.alertService.informativo(response.message);
      this.modalCtrl.dismiss();
      this.route.navigate(['inicio/arqueo']);
    }

   }

   async salteado(detalle:any){

    let fechaNueva = moment(detalle.fechaVencimiento).add(1,'days')
  
    this.parametro = {
     id_pedido:detalle.id_pedido,
     fecha_vencimiento:fechaNueva.format('YYYY-MM-DD'), 
     monto:detalle.monto,
     cuota_numero:detalle.cuota_numero,
     cancelado:detalle.cancelado,
     mora:detalle.mora,
     moraDias:detalle.moraDias,
     moraCancelado:detalle.moraCancelado
   }
  
  const response:any = await this.pedidoService.noPagado(this.parametro,detalle.id);
  if(response.success){
    this.alertService.informativo('Cuota pasada al dia siguiente');
    this.modalCtrl.dismiss();
  }else{
   this.alertService.informativo(response.message);
   this.modalCtrl.dismiss();
   this.route.navigate(['inicio/arqueo']);
 }
   }

   async  detalles(detalle:[]){
    const modal = await this.modalCtrl.create({
      component:DetallePage,
      componentProps:{
        detalle:detalle,
        nombre:this.nombre
      }
    });
   await modal.present();
   }

   async pagoParcialMora(detalle:[]){
    const modal = await this.modalCtrl.create({
      component:MoraParcialPage,
      componentProps:{
        detalle:detalle,
        nombre:this.nombre
      }
    });
   await modal.present();

   }

}
