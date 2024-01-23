import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortStr',
  standalone: true,
})
export class ShortPipe implements PipeTransform {
  transform(value: string, maxChar: number): string {
    return value.length > maxChar - 3 ? value.slice(0, maxChar - 3).trim().concat('...') : value;
  }
}
