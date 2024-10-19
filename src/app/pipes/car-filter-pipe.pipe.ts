import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe',
  standalone: true,
})
export class CarFilterPipePipe implements PipeTransform {
  transform(value: Car[], filterText: string | null): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : null;

    return filterText
      ? value.filter(
          (c) =>
            c.brandName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            c.colorName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            c.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
