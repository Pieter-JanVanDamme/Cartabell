import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../user/authentication.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  // override intercept method, with request and standard handler
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token.length) {
      // check if we have valid token in our authentication service, add to headers if we do
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${this.authService.token}`)
      });
      return next.handle(clonedRequest); // HttpHandler can handle request with token
    }
    return next.handle(req);
  }
}
