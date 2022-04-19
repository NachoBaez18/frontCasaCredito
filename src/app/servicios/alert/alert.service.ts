import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alrtCtrl:AlertController) { }


  async informativo(mensaje:string) {
    const alert = await this.alrtCtrl.create({
      message: mensaje,
    });
    await alert.present();
  }




}
