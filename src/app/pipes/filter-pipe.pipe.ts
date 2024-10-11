import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText:string|null): Car[] {

    filterText = filterText?filterText.toLocaleLowerCase():null;
    

    return filterText?value.filter((c:Car)=>c.brandName.toLocaleLowerCase().indexOf(filterText)!==-1) : value; 
  }

}
