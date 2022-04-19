import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private servicioUsuario:UsuarioService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.servicioUsuario.validarToken();
  }

  
}
