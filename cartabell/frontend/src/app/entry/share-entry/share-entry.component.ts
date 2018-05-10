import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef, MatCheckbox } from "@angular/material";
import { AddMarkerComponent } from '../marker/add-marker/add-marker.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-share-entry',
  templateUrl: './share-entry.component.html',
  styleUrls: ['./share-entry.component.css']
})
export class ShareEntryComponent implements OnInit {
  form: FormGroup;
  usernames : string[];

  constructor (private fb: FormBuilder,
      private dialogRef: MatDialogRef<AddMarkerComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
    this.usernames = data.usernames;
    this.form = fb.group({
      shareWith : ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  share() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
