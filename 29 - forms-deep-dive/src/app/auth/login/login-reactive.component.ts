import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl) {
  if (control.value != 'test@example.com') {
    return of(null);
  }

  return of({ notUnique: true });
}

const savedFormEmail = window.localStorage.getItem('saved-form-email');
let initialValue = '';
if (savedFormEmail) {
  initialValue = JSON.parse(savedFormEmail).email;
}

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  });

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid;
  }

  ngOnInit(): void {
    const sub = this.form.valueChanges.subscribe({
      next: value => {
        window.localStorage.setItem('saved-form-email', JSON.stringify({ email: value.email }));
      }
    })

    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  onSubmit() {
    if (this.form.invalid) return;

    console.log(this.form.value.email);
    console.log(this.form.value.password);
  }
}