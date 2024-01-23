import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat',
  standalone: true,
})
export class CpfFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const cleanString = value.toString().replace(/\D/g, '');

    return cleanString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
