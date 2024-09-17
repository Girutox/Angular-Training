import { Component } from '@angular/core';

import { LoginTemplateComponent } from './auth/login/login-template.component';
import { LoginComponent } from "./auth/login/login-reactive.component";
import { SignupComponent } from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginTemplateComponent, LoginComponent, SignupComponent],
})
export class AppComponent {}
