import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor( private loadCtrl:LoadingController) { }

  async presentLoading(mensaje) {
    const loading = await this.loadCtrl.create({
      message:mensaje,
      duration: 1000
    });
    await loading.present();
  }

}
