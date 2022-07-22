import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'senha'
})

export class SenhaPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (value.length > 1) {
      return value.replace(value, '******');
    }
  }
}
