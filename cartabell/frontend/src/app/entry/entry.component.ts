import { Component, OnInit, Input, SystemJsNgModuleLoader, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Entry } from './entry.model';
import { Marker } from './marker/marker.model';
import { MatDialog, MatDialogConfig} from "@angular/material";
import { AddMarkerComponent } from './marker/add-marker/add-marker.component';
import { ShareEntryComponent } from './share-entry/share-entry.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() entry: Entry;
  @Input() keynote : boolean;
  @Input() markers: Array<Marker>;
  @Input() user: string;
  @Input() usernames: string[];
  @Output() deleteEntry = new EventEmitter<Entry>();
  @Output() updateEntry = new EventEmitter<Entry>();

  constructor(private dialog: MatDialog) {  }

  ngOnInit() {
  }

  addMarkerDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false; // user can close dialog by clicking outside of it
    dialogConfig.autoFocus = true; // autofocus on first form field
    //dialogConfig.direction = "rtl";
    dialogConfig.data = {
      title: (this.entry.title == null ? "Untitled Scribble" : this.entry.title)
    };

    const dialogRef = this.dialog.open(AddMarkerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.entry.addMarker(new Marker(data["markerColor"], data["markerName"]));
        this.updateEntry.emit(this.entry);
      })
  }

  markerRemoved(marker:Marker) {
    // called from entry.component.html, remove given marker from the model's Array<Marker>
    this.entry.removeMarker(marker);
    this.updateEntry.emit(this.entry);
  }

  toggleKeynote(){
    this.entry.toggleKeynote();
    this.entry.updateDateModified();
    this.updateEntry.emit(this.entry);
  }

  removeEntry(){
    /*
     * TODO
     * Add conditional; if user != entry.author, only remove user from entry.collaborators
     */
    this.deleteEntry.emit(this.entry);
  }

  updateTitle(val){
    this.entry.title = val;
    this.entry.updateDateModified();
    this.updateEntry.emit(this.entry);
  }

  updateContents(val){
    this.entry.contents = val;
    this.entry.updateDateModified();
    this.updateEntry.emit(this.entry);
  }

  shareEntryDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false; // user can close dialog by clicking outside of it
    dialogConfig.autoFocus = true; // autofocus on first form field
    //dialogConfig.direction = "rtl";
    // splicing won't work as expected if done upon assigning data["usernames"]
    this.usernames.splice(this.usernames.indexOf(this.user),1);
    dialogConfig.data = {
      usernames : this.usernames
    };

    const dialogRef = this.dialog.open(ShareEntryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => { 
        this.entry.addToCollaborators(data["shareWith"]);
        this.updateEntry.emit(this.entry);
      }
    );
  }

}
