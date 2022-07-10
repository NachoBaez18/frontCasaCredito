import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Arqueo } from 'src/app/moldels/arqueo';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { ArqueoService } from 'src/app/servicios/arqueo.service';

@Component({
  selector: 'app-detalle-arqueo',
  templateUrl: './detalle-arqueo.page.html',
  styleUrls: ['./detalle-arqueo.page.scss'],
})
export class DetalleArqueoPage implements OnInit {

  @Input() arqueo:Arqueo;
  @Input() accion:boolean;
  @Input() detalle:boolean;

  form:FormGroup;
  inputDisabled:boolean;
  boton:boolean;

  parametros={};


  constructor( private fb:FormBuilder,
                private arqueoService:ArqueoService,
                private alertService:AlertService,
                private modalCtrl:ModalController) { 

                  this.form = this.fb.group({
                    caja:['',Validators.required],
                    entregado:[''],
                    cobrado:[''],
                    arqueoDia:[''],
                  });
                }

  ngOnInit() {
    this.botones();
      if(!this.accion && !this.detalle){
        this.inputDisabled = false;
        this.form.controls['caja'].setValue(this.arqueo.caja);
        this.form.controls['entregado'].setValue(this.arqueo.entregado);
        this.form.controls['cobrado'].setValue(this.arqueo.cobrado);
        this.form.controls['arqueoDia'].setValue((this.arqueo.caja + this.arqueo.cobrado)-this.arqueo.entregado);
      }
      if(this.accion && this.detalle){
        this.inputDisabled = true;
        this.form.controls['caja'].setValue(this.arqueo.caja);
        this.form.controls['entregado'].setValue(this.arqueo.entregado);
        this.form.controls['cobrado'].setValue(this.arqueo.cobrado);
        this.form.controls['arqueoDia'].setValue((this.arqueo.caja + this.arqueo.cobrado)-this.arqueo.entregado);
      }
      
  }

  async botones(){
    if(this.arqueo === null){
      this.boton = true;
    }else{
   const response:any = await this.arqueoService.getUltimo();
   if(response.success){
    if(response.data.id === this.arqueo.id && this.arqueo.cerrado ==='N'){
        this.boton = true;
    }else{
      this.boton = false;
      
    }
    }

  }
  
}

  async guardar(){

    const response: any = await this.arqueoService.registrar(this.form.value);
    if (response.success) {
     
      setTimeout(() => {
      this.alertService.informativo('Caja registrada');
      this.modalCtrl.dismiss();
      },1000);
    } else {
        this.alertService.informativo('Error en el registro');
    }
  }

 async editar(){
    const response: any = await this.arqueoService.actualizar(this.form.value, this.arqueo.id);
    if (response.success) {
      setTimeout(() => {
        this.alertService.informativo('Caja actualizada');
        this.modalCtrl.dismiss();
      }, 1000);
    } else {
      this.alertService.informativo('Error en el registro');
    }

  }
 async cerrarCaja(){
   this.parametros = {
     caja:this.form.value.caja,
     entregado:this.form.value.entregado,
     cobrado:this.form.value.cobrado,
     arqueoDia:(this.arqueo.caja + this.arqueo.cobrado)-this.arqueo.entregado,
     cerrado:'S'

   }
  const response: any = await this.arqueoService.cerraCaja(this.parametros, this.arqueo.id);
  if (response.success) {
    setTimeout(() => {
      this.alertService.informativo('Caja cerrada');
      this.modalCtrl.dismiss();
    }, 1000);
  } else {
    this.alertService.informativo('Error en el registro');
  }
  }

}
