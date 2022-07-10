import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-mora-parcial',
  templateUrl: './mora-parcial.page.html',
  styleUrls: ['./mora-parcial.page.scss'],
})
export class MoraParcialPage implements OnInit {

  form:FormGroup;
  inputDisabled:boolean = true;
  @Input() detalle:any;
  @Input() nombre:string;
  parametro = {};

  constructor(private fb:FormBuilder,
              private pedidoService:PedidoService,
              private alertService:AlertService,
              private modalCtrl:ModalController) { 
    this.form = this.fb.group({
      nombre:['',Validators.required],
      cuota:['',Validators.required],
      mora:['',Validators.required],
      n_cuota:['',Validators.required],
      moraDias:['',Validators.required],
      fecha:['',Validators.required],
      moraMonto:['',Validators.required],
    });
  }

  ngOnInit() {
    this.form.controls['nombre'].setValue(this.nombre);
    this.form.controls['cuota'].setValue(this.detalle.monto);
    this.form.controls['mora'].setValue(this.detalle.mora);
    this.form.controls['n_cuota'].setValue(this.detalle.cuota_numero);
    this.form.controls['moraDias'].setValue(this.detalle.moraDias);
    this.form.controls['fecha'].setValue(this.detalle.fecha_vencimiento);
  }

  async pagoMora(){
      let monto_nuevo = this.form.value.mora - this.form.value.moraMonto;
    this.parametro = {
      id:this.detalle.id,
      mora:monto_nuevo,
      montoArqueo:this.form.value.moraMonto
    }
    const response:any = await this.pedidoService.pagoParcialMora(this.parametro);
    if(response.success){
      this.alertService.informativo('Mora pagada');
      this.modalCtrl.dismiss();
     }
   }
 

}
