import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1]; // only the backend knows the secret!
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64)); // parse the token
}

@Injectable()
// authentication service will manage login/registration backend calls
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser'; // store token in localstorage to remember user
  private _user$: BehaviorSubject<string>;
  private readonly _url = '/API/users';
  public redirectUrl: string;
  
  constructor(private http: HttpClient) {
    // check localstorage for token, parse it using earlier defined function
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      // check for an expire date; this is mostly a UX issue, not a security issue
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    // user becomes a BehaviorSubject, a subject that always has a value even before
    // subscribing. Other components can subscribe and see the logged-on user.
    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.username);
  }   

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }
  
  login(username: string, password: string): Observable<boolean> {
    // post to /API/users/login route with username and password
    // note use of ES2015 object initializer syntax iso {username:username, password:password}
    return this.http.post(`${this._url}/login`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          // if the login is succesful, our backend returns the jwt token as a json response
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username); // signal through BehaviorSubject new user is logged in
          return true;
        } else {
          return false;
        }
      })
    );
  }
  
  register(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/register`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      })
    );
  } 

  checkUserNameAvailability(username: string): Observable<boolean> {
    // call the route with username and check response
    return this.http.post(`${this._url}/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }
  
  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem('currentUser'); // remove the token
      /* change value on next job queue tick to prevent errors;
      otherwise we're updating values while processing changes in the change detection chain */
      setTimeout(() => this._user$.next(null)); 
    }
  }
}