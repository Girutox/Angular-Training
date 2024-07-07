import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const filterString = <string>args[0];
    const columnName = <string>args[1];

    if (filterString == '') {
      return value
    }

    const result = [];
    for (const item of value) {
      if ((<string>item[columnName]).toLowerCase().includes(filterString.toLowerCase())) {
        result.push(item);
      }  
    }
    return result;
  }

}
