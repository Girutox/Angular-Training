import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_KEY = ''
  userChanged = new BehaviorSubject<User>(null);
  private autoLogoutTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.errorHandler),
      tap(
        response => {
          this.authHandler(response.email, response.localId, response.idToken, +response.expiresIn);
        }
      )
    )
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.errorHandler),
      tap(
        response => {
          this.authHandler(response.email, response.localId, response.idToken, +response.expiresIn);
        }
      )
    )
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (user.token) {
      this.autLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime())

      this.userChanged.next(user);
    }
  }

  logOut() {
    this.userChanged.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }

  autLogout(timeout: number) {
    console.log(timeout);
    
    this.autoLogoutTimer = setTimeout(() => {
      this.logOut();
    }, timeout);
  }

  private authHandler(email: string, id: string, token: string, expiresIn: number) {
    const tokenExpirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, id, token, tokenExpirationDate);

    localStorage.setItem('userData', JSON.stringify(user));

    this.autLogout(expiresIn * 1000);

    this.userChanged.next(user);
  }

  private errorHandler(error: HttpErrorResponse) {
    let errorMessage = 'An error occured!';

    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.'
        break;
    }

    return throwError(errorMessage);
  }
}
