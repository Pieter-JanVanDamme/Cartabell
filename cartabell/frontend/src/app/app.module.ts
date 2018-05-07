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
import { AppRoutingModule } from './app-routing/app-routing.module';

const appRoutes: Routes = [
  { path: 'entries', component: EntryListComponent },
  { path: '', redirectTo: 'entries', pathMatch: 'full'}, // empty
  { path: '**', component: PageNotFoundComponent} // catch-all
];

@NgModule({
  declarations: [
    AppComponent,
    Autosize,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
