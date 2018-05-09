import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Entry } from '../entry.model';
import { EntryDataService } from '../entry-data.service';
import { distinctUntilChanged, debounceTime, map, filter, debounce } from 'rxjs/operators';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  private _entries : Entry[];
  //private _username : string;

  public filterEntryByTag : string;
  public filterEntryByTagColor : string;
  public onlyKeynotes : boolean;
  public filterEntryByContents : string;
  public filterTag$ = new Subject<string>();
  public filterTagColor$ = new Subject<string>();
  public filterContents$ = new Subject<string>();
  public sortEntries$ = new Subject<string>();

  public errorMessage : string;

  colors = [
    {name: "Any Color", value: ""},
    {name: "Red", value: "red"},
    {name: "Orange", value: "orange"},
    {name: "Yellow", value: "yellow"},
    {name: "Olive", value: "olive"},
    {name: "Green", value: "green"},
    {name: "Teal", value: "teal"},
    {name: "Blue", value: "Blue"},
    {name: "Violet", value: "violet"},
    {name: "Purple", value: "purple"},
    {name: "Pink", value: "pink"},
    {name: "Brown", value: "brown"},
    {name: "Grey", value: "grey"}
  ]

  constructor(private _entryDataService : EntryDataService,
        private _authService : AuthenticationService) {
    this.filterTag$.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(val => val.toLowerCase())
    ).subscribe(val => this.filterEntryByTag = val);
    this.filterTagColor$.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(val => val.toLowerCase())
    ).subscribe(val => this.filterEntryByTagColor = val);
    this.filterContents$.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(val => val.toLowerCase())
    ).subscribe(val => this.filterEntryByContents = val);
    this.sortEntries$.pipe(
      distinctUntilChanged(),
      debounceTime(2000)
    ).subscribe();
  }

  ngOnInit() {
    this._entryDataService.entries.subscribe( // subscribe in code…
      items => this._entries = items, //… unwrap the result in callback
      (error : HttpErrorResponse) => {
        this.errorMessage = `Error ${error.status} while trying to retrieve entries: ${error.error}`;
      });
      
      /*this.currentUser.subscribe(
        (val) => this._username = val,
        (err) => this.errorMessage = err, 
        () => this.errorMessage = "Unknown user, please contact support."
      );*/
  }

  get entries() {
    return this._entries;
  }

  get currentUser(): Observable<string> {
    return this._authService.user$;
  }

  entryRemoved(entry : Entry){
    this._entryDataService.removeEntry(entry).subscribe(
      item => (this._entries = this._entries.filter(val => item.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error ${error.status} while removing entries for ${
          entry.title
        }: ${error.error}`;
      }
    );
  }

  updateEntry(entry : Entry){
    this._entries.splice(this._entries.indexOf(entry), 1);
    this._entryDataService.updateEntry(entry).subscribe(
      item => this._entries.push(item),
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error ${error.status} while updating ${
          entry.title}: ${error.error}`;
      }
    );
  }

  toggleKeynotesOnly(){
    this.onlyKeynotes = !this.onlyKeynotes;
  }

}
