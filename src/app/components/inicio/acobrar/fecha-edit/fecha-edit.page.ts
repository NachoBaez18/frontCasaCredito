import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-fecha-edit',
  templateUrl: './fecha-edit.page.html',
  styleUrls: ['./fecha-edit.page.scss'],
})
export class FechaEditPage implements OnInit {

  form:UntypedFormGroup;
  inputDisabled:boolean = true;
  @Input() idPedido:any;
  @Input() nombre:string;
  parametro = {};
  dato:number;

  constructor(
              private pedidoService:PedidoService,
              private alertService:AlertService,
              private modalCtrl:ModalController) { 
   
  }

  ngOnInit() {
  }
   async editar (){
    this.parametro = {
      id:this.idPedido,
      dato:this.dato
    }
    const response:any = await this.pedidoService.updateFecha(this.parametro)
    if(response.success){
      this.alertService.informativo('Fecha actualizada');
      this.modalCtrl.dismiss();
    }



   }

}
