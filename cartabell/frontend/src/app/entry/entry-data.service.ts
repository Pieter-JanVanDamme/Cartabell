import { Injectable } from '@angular/core';
import { Entry } from './/entry.model';
import { Marker } from './marker/marker.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../user/authentication.service';


@Injectable()
export class EntryDataService {
  private readonly _appUrl = '/API'; 
  private _username : string;

  constructor(private http: HttpClient,
    private authService : AuthenticationService) {
      this.authService.user$.subscribe(
        (val) => this._username = val
      );
  }

  get entries(): Observable<Entry[]> { // return type from .get method
    return this.http
      .get(this._appUrl+'/entries/', { params : {user : this._username}}) // /API/entries, returns json array of recipes Observable<Object>
      .pipe(
        // note: two DIFFERENT map functions! One on Observable, the other on Array
        map((list: any[]): Entry[] => // RxJS.map converts Observable<T> to Observable<U>
          list.map(item => Entry.fromJSON(item)) // map on result to convert each json element to Entry object
        )
      );
  }

  welcomeNewUser(name : string) : Observable<Entry> {
    return this.addNewEntry(new Entry(
      "Welcome, " + name + "!",
      "Welcome to Cartabell', " + name + "!\n\n(You can make this text area bigger by dragging from the"
      + " lower right, just above my name.)\n\nCartabell makes it easy to make quick Scribbles, put some markers"
      + " on them so you can find them later, and share them with others.\n\nTry creating a new Scribble"
      + " with the pencil icon at the top right.\n\nYou can add a marker with a colour and name of your"
      + " choosing by clicking the plus icon at the bottom right of every Scribble.\n\nImportant Scribbles"
      + " can be \"starred\" using the star icon at the top left. These will always appear on the top of"
      + " the page (most recently modified ones come first).\n\nEven if you've got a lot of them, it's easy"
      + " to find Scribbles using the filters near the top of the page. You can search for specific words"
      + " in the title or contents of your Scribbles, but you can also filter by your markers' names and"
      + " colors.\n\nScribbles can be also shared by clicking the arrow icon at the top right of every Scribble"
      + " and choosing someone to share with. They will find your Scribble when they log on.\n\nIf you delete"
      + " a Scribble someone shared with you, it will only remove it from *your* Scribbles. So don't worry"
      + " about accidently deleting someone else's Scribbles!\n\nHappy scribbling!\n\n\n\nFun fact: our name"
      + " comes from the Italian \"Scartabello\", which means booklet. Bet you didn't know that!",
      true,
      [new Marker("red", "#Welcome to " + name + "!")],
      "Pieter-Jan",
      [name]
    ))
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