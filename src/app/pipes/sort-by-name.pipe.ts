import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByName'
})
export class SortByNamePipe implements PipeTransform {

  transform(array: any[], propName: string): any[] {
    if(!Array.isArray(array)) {
      return array
    }
    return array.sort((a, b) => {
      const nameA = a[propName].toLowerCase();
      const nameB = b[propName].toLowerCase();

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
