import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../../../entry/entry.model';

@Pipe({
  name: 'entryByContents'
})
export class EntryByContentsPipe implements PipeTransform {

  transform(entries : Entry[], searchString : string): Entry[] {
    console.log(searchString);
    if (!searchString || searchString.length === 0) {
      return entries;
    }
    return entries.filter(entr =>
      (entr.title == null ? false : entr.title.toLowerCase().indexOf(searchString) != -1) ||
        (entr.contents == null ? false : entr.contents.toLowerCase().indexOf(searchString) != -1)
      );
  }
}
