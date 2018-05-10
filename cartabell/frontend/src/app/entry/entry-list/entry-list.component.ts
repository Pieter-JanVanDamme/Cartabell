import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { Entry } from '../entry.model';
import { EntryDataService } from '../entry-data.service';
import { UserDataService } from '../../user/user-data.service';
import { distinctUntilChanged, debounceTime, map, filter, debounce } from 'rxjs/operators';
import { AuthenticationService } from '../../user/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  private _entries : Entry[];
  private _username : string;
  private _usernames : string[];

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
        @Inject('userDataService') private _userDataService,
        private _authService : AuthenticationService,
        private route : ActivatedRoute) {
    this.currentUser.subscribe(
      (val) => this._username = val
    );
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
        this.errorMessage = `Error ${error.status} while trying to retrieve scribbles: ${error.error}`;
      });
      this._userDataService.usernames.subscribe(
        names => this._usernames = names,
        (err : HttpErrorResponse) => {
          this.errorMessage = `Error ${err.status} while trying to retrieve usernames: ${err.error}`;
        }
      );
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
      item => {
        // don't add entry to our list if we're no longer a collaborator
        if(item.author == this._username ||
            item.collaborators.indexOf(this._username) != -1)
          this._entries.push(item)
      },
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
