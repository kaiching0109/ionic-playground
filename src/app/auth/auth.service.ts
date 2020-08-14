import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  kind: string,
  idToken: string;
  email: string;
  refreshToken: string;
  lcoalId: string;
  expiresIn: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userIsAuthenticated: boolean = false;
  private _userId: string;
  

  get userId() {
    return this._userId;
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
      //email, password, returnSecureToken
      const URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
      return this.http.post<AuthResponseData>(
        `${URL}${environment.firebaseAPIKey}`, { email, password, returnSecureToken: true }
      )
      // .pipe(
      //   switchMap(resData => {
      //     return resData
      //   }),
      //   take(1),
      //   tap(() => {
      //     console.log('DONE')
      //   })
      // )
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }
}
