import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../../servicios/usuario.service';
import { LoadingService } from '../../../servicios/loading/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo:string;

  constructor(private usuarioService:UsuarioService,
              private loadService:LoadingService,
              private router:Router) { }

  ngOnInit() {}

  cerrSesion(){
  this.loadService.presentLoading('');
  setTimeout(()=>{ 
    const response:any =  this.usuarioService.cerrarSession();
    this.router.navigate(['/login']);
  },1000);
 
  }

}
