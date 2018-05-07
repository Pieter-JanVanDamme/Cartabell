import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatCheckbox } from "@angular/material";
import { AddMarkerComponent } from '../marker/add-marker/add-marker.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Marker } from '../marker/marker.model';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {
  form : FormGroup;
  markers : Marker[] = [];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEntryComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private dialog : MatDialog) {
      this.form = fb.group({
        entryTitle : ["", [Validators.required, Validators.maxLength(160)]],
        entryContents : ["", Validators.required],
        entryIsKeynote : [false, Validators.required],
        markers : [[]]
      });
  }

  ngOnInit() {
  }

  addMarkerDialog() {
    const diaConfig = new MatDialogConfig();

    diaConfig.disableClose = false;
    diaConfig.autoFocus = true;
    diaConfig.data = {
      title: "New Scribble"
    };

    const diaRef = this.dialog.open(AddMarkerComponent, diaConfig);

    diaRef.afterClosed().subscribe(
      data => this.markers.push(new Marker(data["markerColor"], data["markerName"]))
    );
  }

  markerRemoved(marker:Marker) {
    let index = this.markers.indexOf(marker);
    if(index != -1)
      this.markers.splice(index, 1);
  }

  create() {
    this.form.controls['markers'].setValue(this.markers);
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
