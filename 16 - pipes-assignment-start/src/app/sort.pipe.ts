import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    const columnToSort = <string>args[0];

    return [...value].sort((a, b) => {
      if (a[columnToSort] < b[columnToSort]) {
        return -1;
      } else if (a[columnToSort] > b[columnToSort]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
