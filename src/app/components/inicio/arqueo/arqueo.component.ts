import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Arqueo } from 'src/app/moldels/arqueo';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { ArqueoService } from 'src/app/servicios/arqueo.service';
import { DetalleArqueoPage } from './detalle-arqueo/detalle-arqueo.page';

@Component({
  selector: 'app-arqueo',
  templateUrl: './arqueo.component.html',
  styleUrls: ['./arqueo.component.scss'],
})
export class ArqueoComponent implements OnInit {

  listaArqueos:Arqueo[]=[];
  listaFecha:any[]=[]; 
  textoBuscar = '';
  parametro:{} = {}

  constructor(private arqueoService:ArqueoService,
              private modalCtrl:ModalController,
              private alertService:AlertService)  { }

  ngOnInit() {
    this.getArqueo();
  }

  async getArqueo(){
    
    const response:any = await this.arqueoService.get(null,null);
    this.listaArqueos = response.data;
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  async AbrirRegistro(valor:boolean,arqueo:Arqueo,detalle:boolean){
    const modal = await this.modalCtrl.create({
       component:DetalleArqueoPage,
       componentProps:{
         accion:valor,
         arqueo:arqueo,
         detalle:detalle
       }
     });
    await modal.present();
   }

   doRefresh(event){
    setTimeout(() => {
      this.getArqueo();
      event.target.complete();
    }, 1500);
   }

   async editar(valor:boolean,arqueo:Arqueo,detalle:boolean){
        this.AbrirRegistro(valor,arqueo,detalle);
   }

   detalle(valor:boolean,arqueo:Arqueo,detalle:boolean){
    this.AbrirRegistro(valor,arqueo,detalle);
   }

}
