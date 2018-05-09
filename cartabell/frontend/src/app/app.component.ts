import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Entry } from './entry/entry.model';
import { Marker } from './entry/marker/marker.model';
import { EntryDataService } from './entry/entry-data.service';
import { MatDialog, MatDialogConfig} from "@angular/material";
import { AuthenticationService } from './user/authentication.service';
import { AddEntryComponent } from './entry/add-entry/add-entry.component';
import { EntryListComponent } from './entry/entry-list/entry-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EntryDataService]
})
export class AppComponent {
  private routedComponent;

  _username : string;

  constructor( private authService : AuthenticationService,
        private _entryDataService : EntryDataService,
        private dialog : MatDialog) {
        this.currentUser.subscribe(
          (val) => this._username = val
        );
  }

  get currentUser(): Observable<string> {
    return this.authService.user$;
  }

  get entries() {
    return this._entryDataService.entries;
  }

  newEntryAdded(entry) {
    this._entryDataService.addNewEntry(entry)
      .subscribe(item => this.routedComponent.entries.push(item));
  }

  addEntryDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false; // user can close dialog by clicking outside of it
    dialogConfig.autoFocus = true; // autofocus on first form field
    //dialogConfig.direction = "rtl";
    dialogConfig.data = {
      username : this._username
    };

    const dialogRef = this.dialog.open(AddEntryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => this.newEntryAdded(new Entry(data["entryTitle"], data["entryContents"],
      data["entryIsKeynote"], data["markers"], data["author"]))
    );
  }
}
