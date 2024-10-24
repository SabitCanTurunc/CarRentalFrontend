import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAdmin',
  standalone: true
})
export class IsAdminPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
