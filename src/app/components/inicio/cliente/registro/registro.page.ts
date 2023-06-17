import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/moldels/cliente';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  @Input() accion:boolean;
  @Input() cliente:Cliente;
  @Input() detalle:boolean;
  form:UntypedFormGroup;
  inputDisabled:boolean;


  constructor( private fb:UntypedFormBuilder,
                private clienteService:ClienteService,
                private alertService:AlertService,
                private modalCtrl:ModalController) { 

                  this.form = this.fb.group({
                    nombre:['',Validators.required],
                    cedula:['',Validators.required],
                    telefono:['',Validators.required],
                    ciudad:['',Validators.required],
                  });
                }

  ngOnInit() {
      if(!this.accion && !this.detalle){
        this.inputDisabled = false;
        this.form.controls['nombre'].setValue(this.cliente.nombre);
        this.form.controls['cedula'].setValue(this.cliente.cedula);
        this.form.controls['telefono'].setValue(this.cliente.telefono);
        this.form.controls['ciudad'].setValue(this.cliente.ciudad);
      }
      if(this.accion && this.detalle){
        this.inputDisabled = true;
        this.form.controls['nombre'].setValue(this.cliente.nombre);
        this.form.controls['cedula'].setValue(this.cliente.cedula);
        this.form.controls['telefono'].setValue(this.cliente.telefono);
        this.form.controls['ciudad'].setValue(this.cliente.ciudad);
      }

      
  }

  async guardar(){

    const response: any = await this.clienteService.registrar(this.form.value);
    if (response.success) {
     
      setTimeout(() => {
      this.alertService.informativo('Cliente registrado');
      this.modalCtrl.dismiss();
      },1000);
    } else {
        this.alertService.informativo('Error en el registro');
    }
  }

 async editar(){
    const response: any = await this.clienteService.actualizar(this.form.value, this.cliente.id);
    if (response.success) {
      setTimeout(() => {
        this.alertService.informativo('Cliente actualizado');
        this.modalCtrl.dismiss();
      }, 1000);
    } else {
      this.alertService.informativo('Error en el registro');
    }

  }

 

}
