import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomSort',
})
export class RandomSortPipe implements PipeTransform {
  transform(value: Array<unknown>, ...args: unknown[]): Array<any> {
    const list = [...value];

    list.sort(() => Math.random() - 0.5);

    return list;
  }
}
