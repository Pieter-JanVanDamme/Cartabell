import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Marker } from './marker.model';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {
  @Input() marker : Marker;
  @Output() public removeMarker = new EventEmitter<Marker>();

  constructor() { }

  ngOnInit() {
  }

  cutMarker(){
    // let the removeMarker EventEmitter emit the event on the specifiek marker which is processed by entry.component.html
    this.removeMarker.emit(this.marker);
  }

}
