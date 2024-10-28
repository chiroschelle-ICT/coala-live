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
      // Check if either item has `leiding` as true
      if (a.leiding && !b.leiding) {
        return 1;  // Move `a` after `b`
      } else if (!a.leiding && b.leiding) {
        return -1; // Move `b` after `a`
      }

      // If both have the same `leiding` value, sort by the specified property
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
