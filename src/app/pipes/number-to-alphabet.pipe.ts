import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToAlphabet',
})
export class NumberToAlphabetPipe implements PipeTransform {
  transform(value: number): string {
    const alphabets = ['A', 'B', 'C', 'D'];

    return alphabets[value];
  }
}
