
import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Cliente } from 'src/app/moldels/cliente';
import { Pedido } from 'src/app/moldels/pedido';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-registro-pedido',
  templateUrl: './registro-pedido.page.html',
  styleUrls: ['./registro-pedido.page.scss'],
})
export class RegistroPedidoPage implements OnInit {

 
  @Input() accion:boolean;
  @Input() pedido:Pedido;
  @Input() detalle:boolean;
  @Input() cliente:Cliente;
  @Input() vCliente:boolean;
  form:UntypedFormGroup;
  pedidoR:{}={};
  inputDisabled:boolean;
  botonHabilitado:boolean=true;
  fechaActual= moment();
  fecha:string=(this.fechaActual).format('YYYY-MM-DD');
  public monto:number;
   public cuota:number ;
   nombre = "";

  


  constructor( private fb:UntypedFormBuilder,
               private pedidoService:PedidoService,
                private alertService:AlertService,
                private modalCtrl:ModalController,
                private router:Router,
                private currencyPipe:CurrencyPipe) { 

                  this.form = this.fb.group({
                    monto:['',Validators.required],
                    cuota:['',Validators.required],
                  });

                }
  ngOnInit() {

    if(!this.accion && !this.detalle){
      this.inputDisabled = false;
      this.botonHabilitado = false;
      this.nombre = this.pedido.cliente.nombre
      this.fecha=this.pedido.fecha_entrega
      this.form.controls['monto'].setValue(this.pedido.monto);
      this.form.controls['cuota'].setValue(this.pedido.n_cuota);
    }
    if(this.accion && this.detalle){
      this.inputDisabled = true;
      this.botonHabilitado = false;
      this.nombre = this.pedido.cliente.nombre;
      this.fecha=this.pedido.fecha_entrega
      this.form.controls['monto'].setValue(this.pedido.monto);
      this.form.controls['cuota'].setValue(this.pedido.n_cuota);
    }
    if(this.accion && !this.detalle && this.vCliente){
      this.nombre = this.cliente.nombre;
    }
    if(this.accion && !this.detalle && !this.vCliente){
      this.nombre="";
    }

  }

  async guardar(){
    
  if(this.nombre.length){
    this.fecha = moment(this.fecha).format('YYYY-MM-DD');

    this.pedidoR ={
     id_cliente:this.cliente.id,
    fecha_entrega:this.fecha,
     monto:this.form.value.monto,
     n_cuota:this.form.value.cuota
    }
   const response: any = await this.pedidoService.registrar(this.pedidoR);
   if (response.success) {
     setTimeout(() => {
     this.alertService.informativo('Pedido registrado');
     this.router.navigate(['inicio/pedido']);
     this.modalCtrl.dismiss();
     },1000);
   } else {
       this.alertService.informativo('Error en el registro');
   }
  }else{
    this.alertService.informativo('Favor selecione el cliente')
   
  }
  
  }

 async editar(){
  this.fecha = moment(this.fecha).format('YYYY-MM-DD');
  this.pedidoR ={
  fecha_entrega:this.fecha,
   monto:this.form.value.monto,
   n_cuota:this.form.value.cuota
  }

 const response: any = await this.pedidoService.actualizar(this.pedidoR,this.pedido.id);

 if (response.success) {
   setTimeout(() => {
   this.alertService.informativo('Pedido actualizado');
   this.modalCtrl.dismiss();
   },1000);
 } else {
     this.alertService.informativo('Error en el registro');
 }

}
 async irCliente(){
  this.router.navigate(['inicio/cliente']);
  this.modalCtrl.dismiss();
}
 
}
