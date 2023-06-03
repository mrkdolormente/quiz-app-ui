import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomSort',
})
export class RandomSortPipe implements PipeTransform {
  /**
   * @param value list to randomize
   * @param args other options
   * @returns randomize list
   */
  transform(value: Array<unknown>, ...args: unknown[]): Array<any> {
    const list = [...value];

    list.sort(() => Math.random() - 0.5);

    return list;
  }
}
