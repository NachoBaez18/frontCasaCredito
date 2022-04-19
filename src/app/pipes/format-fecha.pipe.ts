import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatFecha'
})
export class FormatFechaPipe implements PipeTransform {

  transform(value:string): string {
    moment.locale('es');
    return moment(value).format('dddd, LL');
  }

}
