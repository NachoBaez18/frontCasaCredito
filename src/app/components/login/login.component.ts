import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService} from '../../servicios/alert/alert.service';
import {LoadingService} from '../../servicios/loading/loading.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form:FormGroup

  constructor(private alertService:AlertService,
              private loadService:LoadingService,
              private fb:FormBuilder,
              private router:Router,
              private usuarioService:UsuarioService) {

              this.form = this.fb.group({
                email:['',Validators.required],
                password:['',Validators.required]
              });
               }

  ngOnInit() {}

 async ingresar(){
    const response: any = await this.usuarioService.iniciarSession(this.form.value);
    if (response.success) {
      
    this.loadService.presentLoading('');
    setTimeout(()=>{
      this.router.navigate(['inicio/cliente']);
    },1000);

    } else {
      this.alertService.informativo('Usuario y/o clave incorrecta');
      this.form.reset();
    };

  }

}
