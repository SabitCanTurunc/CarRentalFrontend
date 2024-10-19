import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'brandfilterpipe',
  standalone: true
})
export class BrandColorfilterpipePipe implements PipeTransform {

  transform(value: any[], filterText: string | null): any[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c) =>
            c.name.toLocaleLowerCase().indexOf(filterText) !== -1 
        )
      : value;
  }

}
