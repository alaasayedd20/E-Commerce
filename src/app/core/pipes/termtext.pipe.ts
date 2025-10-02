import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termtext',
  standalone: true
})
export class TermtextPipe implements PipeTransform {

  transform(value:string, limit:number): unknown {
    return value.split(" ", limit).join(" ") ;
  }

}
