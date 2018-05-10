import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  FormControl
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EntryDataService } from '../../entry/entry-data.service';
import { Entry } from '../../entry/entry.model';
import { Marker } from '../../entry/marker/marker.model';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? { 'passwordTooShort': 
      { requiredLength: length, actualLength: control.value.length } } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg : string;

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private entryDataService : EntryDataService
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)], 
        // server side validation of unique name; async validator called
        this.serverSideValidateUsername()],
      // passwords in group so we can add custom validator
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(6)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords })
    });
  }

  serverSideValidateUsername(): ValidatorFn {
    // signature like regular validator, but as we’re async we need an Observable
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authenticationService
        .checkUserNameAvailability(control.value) // we need access to server via this service
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        );
    };
  }

  onSubmit() {
    this.authenticationService
      .register(this.user.value.username, this.passwordControl.value)
      .subscribe(
        val => {
          if (val) {
            let name = this.user.value.username;
            this.entryDataService.addNewEntry(new Entry(
              "Welcome, " + name + "!",
              "Welcome to Cartabell', " + name + "!\n(You can make this text area bigger by dragging from the"
              + " handle just above my name, in the lower right.)\n\nCartabell makes it easy to make quick Scribbles, put some markers"
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
              [name.toLowerCase()]
            )).subscribe(val => val); // need to subscribe, observables are lazy
            this.router.navigate(['/entries']);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
          } while trying to register user ${this.user.value.username}: ${
            error.error
          }`;
        }
      );
  }
}
