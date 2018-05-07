import { Component, OnInit, Input, SystemJsNgModuleLoader, EventEmitter, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Entry } from './entry.model';
import { Marker } from './marker/marker.model';
import { MatDialog, MatDialogConfig} from "@angular/material";
import { AddMarkerComponent } from './marker/add-marker/add-marker.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() entry: Entry;
  @Input() keynote : boolean;
  @Input() markers: Array<Marker>;
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

}
