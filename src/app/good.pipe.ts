import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'good'
})
export class GoodPipe implements PipeTransform {

  transform(name:string): string {
    return 'good '+name;
  }

}
