import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToAlphabet',
})
export class NumberToAlphabetPipe implements PipeTransform {
  /**
   * @description get alphabet character based on the given index
   * @param value alphabets array index value
   * @returns alphabet character
   */
  transform(value: number): string {
    const alphabets = ['A', 'B', 'C', 'D'];

    return alphabets[value];
  }
}
