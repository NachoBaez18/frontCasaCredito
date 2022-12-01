import { Injectable, Output, EventEmitter  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../moldels/usuario';
import { Router } from '@angular/router';

const API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  @Output() loginEmitter = new EventEmitter();
  @Output() logoutEmitter = new EventEmitter();

  token: string = null;
  private usuario: Usuario = null;

  constructor( private http: HttpClient,
               private router: Router) {
 }

 iniciarSession(usuario: any) {
  const headers = new HttpHeaders().set('Content-Type', 'application/json')
  .set('X-Requested-With','XMLHttpRequest');
  return new Promise(resolve => {
    this.http.post(`${API}/user/login`, usuario, { headers })
      .subscribe(
        async (response: any) => {
          if (response.success) {
            // se guarda el token en el Storage
            let data = response.data;
            await this.guardarToken(data.token,data.id);
            // se manda el usuario mediante el emmiter
            this.loginEmitter.emit(this.usuario);
            // se retorna true
            resolve({ success: true });
          }
        },
        (error) => {
          this.token = null;
          localStorage.removeItem('user-admin-token');
          resolve({ success: false, error: error.error });
        }
      );
   });
  }
  
  async guardarToken(token: string, id:string) {
    this.token = token;
    await localStorage.setItem('user-admin-token', token);
    await localStorage.setItem('id',id);
    await this.validarToken();
  }

  async validarToken(): Promise<boolean> {
    await this.cargarToken();
    if (this.token == null) {
      this.router.navigate(['/login']);
      return Promise.resolve(false);
    }

    const data = {
      Authorization:this.token
    };

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization','Bearer '+this.token);
      this.http.post(`${API}/user`,null, { headers })
        .subscribe(
          (response: any) => {
            if (response.success) {
              this.usuario = response.data;
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
    });
  }

  async cargarToken() {
    this.token = await localStorage.getItem('user-admin-token') || null;
  }

  cerrarSession() {
    this.token = null;
    this.usuario = null;
    localStorage.removeItem('user-admin-token');
    this.logoutEmitter.emit(true);
    
  }

}
