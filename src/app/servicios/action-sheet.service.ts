import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {

  constructor(private actionSheetCtrl: ActionSheetController) { }

  async presentActionSheet(data:[]) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Accion a realizar',
      buttons:data,
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

}
