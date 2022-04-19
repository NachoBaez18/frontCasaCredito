import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

    transform(arreglo:any[],
    texto:string,
    columna): any[] {
          if(texto === ''){
        return arreglo;
      }
        texto = texto.toLowerCase();
        return arreglo.filter(item=> {
        return item.cliente[columna].toLowerCase()
        .includes(texto);
    });
  }

}
