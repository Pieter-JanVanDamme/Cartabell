import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../../../entry/entry.model';

@Pipe({
  name: 'entryByTagFilter',
  pure: false
})
export class EntryByTagFilterPipe implements PipeTransform {

  transform(entries : Entry[], searchString : string): Entry[] {
    if (!searchString || searchString.length === 0) {
      return entries;
    }
    return entries.filter(entr =>
      // some() returns true if the predicate is true for at least 1 marker
      // indexOf != 1 returns true if the marker's name contains the searchString
      entr.markers.some(mark => mark.name.toLowerCase().indexOf(searchString.toLowerCase()) != -1)
    );
  }

}
