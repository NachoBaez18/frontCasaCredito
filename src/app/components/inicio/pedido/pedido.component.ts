
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Pedido } from 'src/app/moldels/pedido';
import { AlertService } from 'src/app/servicios/alert/alert.service';
import { LoadingService } from 'src/app/servicios/loading/loading.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { environment } from 'src/environments/environment';
import { RegistroPedidoPage } from './registro-pedido/registro-pedido.page';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  textoBuscar = '';
  parametro = {};
  public header: boolean;
  listaPedidos: Pedido[] = [];
 pedidosOrden = {};
  pedido: Pedido;
  fechaActual = moment();


  constructor(private pedidoService: PedidoService,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private routeAc: ActivatedRoute,
    private route:Router) { }

  ngOnInit() {
    this.getPedidos();
    this.routeAc.queryParams.subscribe((params: any) => {
      this.header = (params.data === "true");
      this.getPedidos();
    });

  }

  buscar(event) {
    this.textoBuscar = event.detail.value;
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getPedidos();
      event.target.complete();
    }, 1500);
  }

  async getPedidos() {
    if (this.header) {
      this.parametro = {
        cancelado: 'N',
        entregado: 'N'
      }
      const response: any = await this.pedidoService.get(null, this.parametro);
      if (response.success) {
        this.listaPedidos = response.data;
      }

    } else {
      this.parametro = {
        cancelado: 'N',
        entregado: 'N',
       // fecha_entrega:this.fechaActual.format('YYYY-MM-DD')
      }
      this.parametro;
      const response: any = await this.pedidoService.get(null, this.parametro);
      if (response.success) {
        this.listaPedidos = response.data;
      }
    }

  }

  detalle(valor: boolean, pedido: Pedido, detalle: boolean) {
    this.AbrirRegistro(valor, pedido, detalle, null);
  }

  async AbrirRegistro(valor: boolean, pedido: Pedido, detalle: boolean, vCliente: boolean) {
    const modal = await this.modalCtrl.create({
      component: RegistroPedidoPage,
      componentProps: {
        accion: valor,
        pedido: pedido,
        detalle: detalle,
        vCliente: vCliente
      }
    });
    await modal.present();
  }

  async editar(valor: boolean, pedido: Pedido, detalle: boolean) {
    this.AbrirRegistro(valor, pedido, detalle, null);
  }

  async entregar(pedido: Pedido) {
    this.cargando(true);

    const response: any = await this.pedidoService.entregar(pedido.id);
    if (response.success) {
      this.cargando(false);
      setTimeout(() => {
        this.alertService.informativo('Pedido entregado');
        this.getPedidos();
      }, 1000);

    } else {
      this.cargando(false);
      this.alertService.informativo(response.message);
      this.route.navigate(['inicio/arqueo']);
    }
  }


  async borrar(pedido: any) {
    const response: any = await this.pedidoService.anular(pedido.id);
    if (response.success) {
      this.alertService.informativo('Pedido eliminado');
    }
  }

  cargando(habilitar: boolean) {
    if (habilitar) {
      this.loadingService.presentLoading('Cargado cuota');
    }
  }

  imprimir(id:number) {
    window.open(`${environment.api}/pedido/reporte/${id}`, '_blank');
  }
  imprimirPedidos(){
    window.open(`${environment.api}/pedido/aEntregarPdf`, '_blank');
  }

 async reorder(event) {

    const itemMover = this.listaPedidos.splice(event.detail.from, 1)[0];
    this.listaPedidos.splice(event.detail.to, 0, itemMover);
    event.detail.complete();

    this.pedidosOrden={
      pedidos:this.listaPedidos
    }
    const response:any = await this.pedidoService.orden(this.pedidosOrden); 
  }
}
