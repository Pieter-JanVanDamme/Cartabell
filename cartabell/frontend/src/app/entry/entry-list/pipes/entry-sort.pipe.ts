import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../../../entry/entry.model';

@Pipe({
  name: 'entrySort',
  pure: false
})
export class EntrySortPipe implements PipeTransform {

  transform(entries, args: string): any {
    // stableSort requires an array as input, and returns the sorted array
    // calling stablesort 3 times, least significant comparator (by title)
    // called first
    if(entries != null){
      return this.stableSort( (e1, e2) => {
        if (e1.keynote == e2.keynote) return 0;
        if (e1.keynote) return -1;
        return 1;
      }, this.stableSort((e1, e2) => {
          if (e1.dateModified > e2.dateModified) return -1;
          if (e1.dateModified < e2.dateModified) return 1;
          return 0;
        }, this.stableSort((e1, e2) => {
            if (e1.title < e2.title) return 1;
            if (e1.title > e2.title) return -1;
            return 0;
          }, entries)));
    }
    return null;
  }

  /* StableSort by Filip Sufitchi */
  stableSort = function(cmp, arr) {
    cmp = !!cmp ? cmp : (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
    let stabilizedThis = arr.map((el, index) => [el, index]);
    let stableCmp = (a, b) => {
      let order = cmp(a[0], b[0]);
      if (order != 0) return order;
      return a[1] - b[1];
    }
    stabilizedThis.sort(stableCmp);
    for (let i=0; i<arr.length; i++) {
      arr[i] = stabilizedThis[i][0];
    }
    return arr;
  }
}
