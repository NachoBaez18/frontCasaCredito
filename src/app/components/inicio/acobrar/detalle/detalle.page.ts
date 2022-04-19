import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  @Input() detalle:any;
  @Input() nombre:string;
  form:FormGroup;
  inputDisabled:boolean = true;

  constructor(private fb:FormBuilder) {

    this.form = this.fb.group({
      nombre:['',Validators.required],
      cuota:['',Validators.required],
      mora:['',Validators.required],
      n_cuota:['',Validators.required],
      fecha:['',Validators.required],
    });
   }

  ngOnInit() {
    console.log(this.detalle);
    this.form.controls['nombre'].setValue(this.nombre);
    this.form.controls['cuota'].setValue(this.detalle.monto);
    this.form.controls['mora'].setValue(this.detalle.mora);
    this.form.controls['n_cuota'].setValue(this.detalle.cuota_numero);
    this.form.controls['fecha'].setValue(this.detalle.fecha_vencimiento);
    
  }

}
