// interceptors are dependencies of the HttpClient service, must be provided in same injector
// that provides HttpClient, or provide them directly in the providers list of the module
// though this is rather verbose
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './AuthenticationInterceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }
];