import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {


  @Input() titulo:string;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}


  salir(){
    this.modalCtrl.dismiss();
  }
}
