import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Autosize } from 'ng-autosize/src/autosize.directive';
import { Browser } from 'protractor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';

import { EntryModule } from './entry/entry.module';
import { EntryListComponent } from './entry/entry-list/entry-list.component';
import { AddEntryComponent } from './entry/add-entry/add-entry.component';

import { UserModule } from './user/user.module';
import { AuthenticationService } from './user/authentication.service';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    Autosize,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EntryModule,
  ],
  providers: [
    AuthenticationService
  ],
  entryComponents: [
    AddEntryComponent // loaded imperatively
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
