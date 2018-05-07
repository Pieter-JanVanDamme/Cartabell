import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../../../entry/entry.model';

@Pipe({
  name: 'entryByTagColorFilter',
  pure: false
})
export class EntryByTagColorFilterPipe implements PipeTransform {

  transform(entries : Entry[], searchColor : string): Entry[] {
    if (!searchColor || searchColor.length === 0) {
      return entries;
    }
    if (searchColor.toLowerCase() == "any color")
      return entries;
    return entries.filter(entr =>
      // some() returns true if the predicate is true for at least 1 marker
      entr.markers.some(mark => mark.color == searchColor.toLowerCase())
    );
  }

}
