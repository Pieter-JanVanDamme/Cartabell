import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
//import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class UserDataService {
  private readonly _appUrl = '/API/users'; 
  private _usernames = new Array<string>();

  constructor(private http: HttpClient /*,
    private authService : AuthenticationService*/) {
      /*this.getUsernamesFromServer().subscribe(val => {
        // convert Object to Array<string>
        this._usernames = new Array<string>();
        let name = "";
        for(let i = 0; i>=0; i++){
          name = val[i];
          if(name == null)
            break;
          this._usernames.push(name);
        }
      });*/
    }

  private getUsernamesFromServer() {
    return this.http
      .get(`${this._appUrl}/names`); 
  } 

  get usernames(): Observable<string[]> {
    return this.http
      .get(`${this._appUrl}/names`)
      .pipe(map(val => {
        // map Observable<Object> to Observable<string[]>
        let usernames = new Array<string>();
        let name = "";
        for(let i = 0; i>=0; i++){
          name = val[i];
          if(name == null)
            break;
          usernames.push(name);
        }
        return usernames;
      }));
  }

}
