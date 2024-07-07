import { Component, ViewChild } from '@angular/core';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  @ViewChild('authForm') authForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs = new Observable<AuthResponse>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, error => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      }
    )
  }

  onHandleClose() {
    this.error = "";
  }
}
