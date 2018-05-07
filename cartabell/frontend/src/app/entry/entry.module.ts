import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryComponent } from './entry.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { MarkerComponent } from './marker/marker.component';
import { AddMarkerComponent } from './marker/add-marker/add-marker.component';
import { EntryByContentsPipe } from './entry-list/pipes/entry-by-contents.pipe';
import { EntryByTagColorFilterPipe } from './entry-list/pipes/entry-by-tag-color-filter.pipe';
import { EntryByTagFilterPipe } from './entry-list/pipes/entry-by-tag-filter.pipe';
import { KeynoteFilterPipe } from './entry-list/pipes/keynote-filter.pipe';
import { EntrySortPipe } from './entry-list/pipes/entry-sort.pipe';
import { EntryDataService } from './entry-data.service';

import { httpInterceptorProviders } from '../http-interceptors/index';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

const routes = [
  { path: 'entries', component: EntryListComponent }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [
    EntryComponent,
    EntryListComponent,
    AddEntryComponent,
    MarkerComponent,
    AddMarkerComponent,
    EntryByContentsPipe,
    EntryByTagColorFilterPipe,
    EntryByTagFilterPipe,
    KeynoteFilterPipe,
    EntrySortPipe
  ],
  providers: [
    EntryDataService,
    httpInterceptorProviders
  ]
})
export class EntryModule { }
