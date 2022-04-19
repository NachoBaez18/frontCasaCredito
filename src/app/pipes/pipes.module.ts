import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { FiltroArrayPipe } from './filtro-array.pipe';
import { FormatFechaPipe } from './format-fecha.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    FiltroArrayPipe,
    FormatFechaPipe
  ],
  exports:[
    FiltroPipe,
    FiltroArrayPipe,
    FormatFechaPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
