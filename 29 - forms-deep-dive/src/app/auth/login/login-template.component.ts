import { afterNextRender, Component, DestroyRef, inject, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login-template',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-template.component.html',
  styleUrl: './login-template.component.css',
})
export class LoginTemplateComponent {
  form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedFormEmail = window.localStorage.getItem('saved-form-email');

      if (savedFormEmail) {
        setTimeout(() => {
          this.form().controls['email'].setValue(JSON.parse(savedFormEmail).email);
        }, 0);
      }

      const sub = this.form().valueChanges?.pipe(
        debounceTime(500)
      ).subscribe({
        next: value => {
          window.localStorage.setItem('saved-form-email', JSON.stringify({ email: value.email }));
        }
      })

      this.destroyRef.onDestroy(() => {
        sub?.unsubscribe();
      })
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    console.log(form);
    // console.log('Email', form.value.email);
    // console.log('Password', form.value.password);

    form.reset();
  }
}
