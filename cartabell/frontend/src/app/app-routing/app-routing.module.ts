import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { AuthGuardService } from '../user/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'entry',
    canActivate: [ AuthGuardService ],
    loadChildren: 'app/entry/entry.module#EntryModule' // <<< THIS IS IMPORTANT
  },
  { path: '', redirectTo: 'entry', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: SelectivePreloadStrategy })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
