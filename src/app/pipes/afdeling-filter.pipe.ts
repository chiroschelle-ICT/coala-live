import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'afdelingFilter'
})
export class AfdelingFilterPipe implements PipeTransform {

  transform(array: any[], propName : string): any[] {
    if(!Array.isArray(array)) {
      return array
    }
    return array.sort((a, b) => {
        const afdelingA = a[propName]
        const afdelingB = b[propName]

        if(afdelingA < afdelingB) {
          return -1
        } else if (afdelingA > afdelingB) {
          return 1
        } else {
          return 0
        }
    });

  }
}
