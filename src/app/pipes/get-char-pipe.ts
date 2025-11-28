import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getchar',
})
export class GetCharPipe implements PipeTransform {
  transform(value: string, ...args: number[]): string {
    const pos = args[0] ?? 0;
    return value[pos];
  }
}
