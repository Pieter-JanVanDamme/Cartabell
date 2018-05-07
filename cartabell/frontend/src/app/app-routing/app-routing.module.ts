import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../user/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'entry',
    canActivate: [ AuthGuardService ],
    loadChildren: '../entry/entry.module.ts'
  },
  { path: '', redirectTo: 'entries', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing : true})
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
