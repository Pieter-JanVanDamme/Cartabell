import { AuthGuardService } from './auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { basehttpInterceptorProviders } from '../http-interceptors';
import { UserDataService } from './user-data.service';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  providers: [
    basehttpInterceptorProviders,
    AuthenticationService,
    AuthGuardService,
    UserDataService
  ]
})
export class UserModule { }
