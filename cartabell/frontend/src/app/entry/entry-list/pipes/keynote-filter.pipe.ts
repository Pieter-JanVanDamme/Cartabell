import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../../../entry/entry.model';

@Pipe({
  name: 'keynoteFilter',
  pure: false
})
export class KeynoteFilterPipe implements PipeTransform {

  transform(entries : Entry[], enabled: boolean): Entry[] {
    if(!enabled)
      return entries;
    return entries.filter(entr =>
      // some() returns true if the predicate is true for at least 1 marker
      // indexOf != 1 returns true if the marker's name contains the searchString
      entr.keynote == true
    );
  }

}
