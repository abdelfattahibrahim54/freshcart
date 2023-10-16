import { Pipe, PipeTransform } from '@angular/core';
import { product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform( arrayOfProducts:product[] , searchingWord:string ) {
    
   return arrayOfProducts.filter(   (x)=>x.title.toLowerCase().includes(searchingWord.toLocaleLowerCase())         )
  }

}
