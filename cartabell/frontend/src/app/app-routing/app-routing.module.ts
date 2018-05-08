import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { AuthGuardService } from '../user/auth-guard.service';
import { EntryListComponent } from '../entry/entry-list/entry-list.component';
import { WelcomeComponent } from '../welcome/welcome.component';

const appRoutes: Routes = [
  {
    path: 'entry',
    canActivate: [ AuthGuardService ],
    loadChildren: 'app/entry/entry.module#EntryModule' // <<< THIS IS IMPORTANT
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'entries', component: EntryListComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: SelectivePreloadStrategy })
  ],
  providers: [
    SelectivePreloadStrategy
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
