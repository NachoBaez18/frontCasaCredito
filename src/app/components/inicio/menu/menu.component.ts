import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {


  id:string = localStorage.getItem('id');

  
  constructor(private router:Router,
              private menuCtrl:MenuController) { }

  ngOnInit() {}

 async irPedidos(header:boolean){
  this.router.navigate(['inicio/pedido'],{queryParams:{data:header}});
  this.menuCtrl.close();
  }

 async irEntregaPedidos(header:boolean){
    this.router.navigate(['inicio/pedido'],{queryParams:{data:header}});
  this.menuCtrl.close();
  }

  async irCobrosHoy(header:boolean){
    this.router.navigate(['inicio/aCobrar'],{queryParams:{data:header}});
    this.menuCtrl.close();
  }
 async irCobros(x:boolean){
  this.router.navigate(['inicio/aCobrarAdelantado'],{queryParams:{data:x}});
  this.menuCtrl.close();
  }

 async irClientes(){
  this.router.navigate(['inicio/cliente']);
  this.menuCtrl.close();
  }

  async irArqueo(){
    this.router.navigate(['inicio/arqueo']);
    this.menuCtrl.close();
  }

}
