import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Marker } from '../marker.model';

@Component({
  selector: 'app-add-marker',
  templateUrl: './add-marker.component.html',
  styleUrls: ['./add-marker.component.css']
})
export class AddMarkerComponent implements OnInit {
  form: FormGroup;
  title: string;

  constructor (private fb: FormBuilder,
      private dialogRef: MatDialogRef<AddMarkerComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.form = fb.group({
      markerColor : ["", Validators.required],
      markerName : ["", [Validators.required, Validators.maxLength(35)]]
    });
  }

  ngOnInit() {
  }

  add() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }

}
