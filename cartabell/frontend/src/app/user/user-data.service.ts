import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
//import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class UserDataService {
  private readonly _appUrl = '/API/users'; 
  private _usernames : string[];

  constructor(private http: HttpClient /*,
    private authService : AuthenticationService*/) {
      this.getUserNames().subscribe(val => {
        this._usernames = [];
        let name = "";
        for(let i = 0; i>0; i++){
          name = val[i];
          if(name == null)
            break;
          this._usernames.push(name);
        }
      });
    }

  getUserNames() {
    return this.http
      .get(`${this._appUrl}/names`); 
  } 

}
