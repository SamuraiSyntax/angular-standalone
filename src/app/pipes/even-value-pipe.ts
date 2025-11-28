import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evenValue',
})
export class EvenValuePipe implements PipeTransform {
  transform(value: number[]): number[] {
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter((num) => num % 2 === 0);
  }
}
