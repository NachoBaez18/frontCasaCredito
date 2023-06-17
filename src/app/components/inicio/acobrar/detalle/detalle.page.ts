import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ActionSheetService } from 'src/app/servicios/action-sheet.service';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { MoraParcialPage } from '../mora-parcial/mora-parcial.page';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  @Input() detalle: any;
  @Input() nombre: string;

  id: string = localStorage.getItem('id');

  form: UntypedFormGroup;
  inputDisabled = true;

  constructor(private fb: UntypedFormBuilder,
              private actioSheet: ActionSheetService,
              private pedidoService: PedidoService,
              private alertService: AlertService,
              private modalCtrl: ModalController,
              private alertController: AlertController) {

    this.form = this.fb.group({
      nombre:['',Validators.required],
      cuota:['',Validators.required],
      mora:['',Validators.required],
      n_cuota:['',Validators.required],
      moraDias:['',Validators.required],
      fecha:['',Validators.required],
    });
   }

  ngOnInit() {
    this.form.controls.nombre.setValue(this.nombre);
    this.form.controls.cuota.setValue(this.detalle.monto);
    this.form.controls.mora.setValue(this.detalle.mora);
    this.form.controls.n_cuota.setValue(this.detalle.cuota_numero);
    this.form.controls.moraDias.setValue(this.detalle.moraDias);
    this.form.controls.fecha.setValue(this.detalle.fecha_vencimiento);
  }

  async reversar(){

   const boton: any = [

    {
      role:'selected',
      text: 'Pago Total',
      handler:async () => await this.volver('total'),
      icon:'reader-outline'
    },
    {
      role:'selected',
      text: 'Pago parcial',
      handler:() => this.volver('parcial'),
      icon:'receipt-outline'
    },

    {
      role:'selected',
      text: 'No pagado',
      handler:() => this.volver('noPago'),
      icon:'eye-off-outline'
    },
    {
      role:'selected',
      text: 'Mora pagada',
      handler:() => this.volver('moraTotal'),
      icon:'file-tray-full-outline'
    },
    {
      role:'selected',
      text: 'Mora parcial pagada',
      handler:() => this.AlertMora(),
      icon:'file-tray-stacked-outline'
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close-outline'
    },

    ];

    this.actioSheet.presentActionSheet(boton);

  }

  async AlertMora() {
    const alert = await this.alertController.create({
      header: 'Monto de mora',
      buttons: [
        {
        text: 'OK!',
        handler: (data: any) => {
          this.volver('moraParcial',data.mora);
        }
      }
    ],
      inputs: [
        {
          name:'mora',
          placeholder: 'Monto',

        },
      ],
    });

    await alert.present();
  }


  async volver(accion: string,mora?: number){

  const parameter = {
    id:this.detalle.id,
    accion,
    mora
  };
    const response: any = await this.pedidoService.rollback(parameter);
     console.log(response);

    if(response.success){

      this.alertService.informativo(response.message);
      this.modalCtrl.dismiss();
    }else{
     this.alertService.informativo(response.message);
     this.modalCtrl.dismiss();
   }

  }

}
