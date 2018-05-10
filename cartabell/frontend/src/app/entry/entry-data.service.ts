import { Injectable } from '@angular/core';
import { Entry } from './/entry.model';
import { Marker } from './marker/marker.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../user/authentication.service';


@Injectable()
export class EntryDataService {
  private _entries = new Array<Entry>();
  private readonly _appUrl = '/API'; 
  private _username : string;
  private usernames : Observable<any>

  constructor(private http: HttpClient,
    private authService : AuthenticationService) {
      this.authService.user$.subscribe(
        (val) => this._username = val
      );
  }

  get entries(): Observable<Entry[]> { // return type from .get method
    return this.http
      .get(this._appUrl+'/entries/', { params : {author : this._username}}) // /API/entries, returns json array of recipes Observable<Object>
      .pipe(
        // note: two DIFFERENT map functions! One on Observable, the other on Array
        map((list: any[]): Entry[] => // RxJS.map converts Observable<T> to Observable<U>
          list.map(item => Entry.fromJSON(item)) // map on result to convert each json element to Entry object
        )
      );
  }

  addNewEntry(entry): Observable<Entry> { // extra parameter: entry
    return this.http
      .post(this._appUrl+'/entries/', entry)
      .pipe(
        map( // Rx.map, post request returns an object, not a list 
          (item: any): Entry =>
            new Entry(item.title, item.contents, item.keynote, item.markers,
              item.author, item.collaborators, item._id, item.dateModified)
        )
      );
  }

  getEntry(id: string): Observable<Entry> {
    return this.http
      .get(`${this._appUrl}/entry/${id}`)
      .pipe(map(Entry.fromJSON));
  }
  
  removeEntry(entr: Entry): Observable<Entry> {
    return this.http
      .delete(`${this._appUrl}/entry/${entr.id}`)
      .pipe(map(Entry.fromJSON));
  }

  updateEntry(entr: Entry): Observable<Entry> {
    return this.http
      .post(`${this._appUrl}/entry/${entr.id}`,
        // request body
        {
          "title" : entr.title,
          "contents" : entr.contents,
          "keynote" : entr.keynote,
          "dateModified" : entr.dateModified,
          "markers" : entr.markers,
          "author": entr.author,
          "collaborators": entr.collaborators
      })
      .pipe(map(Entry.fromJSON));
  } 
}