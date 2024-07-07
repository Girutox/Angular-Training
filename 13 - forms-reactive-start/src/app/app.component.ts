import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  get hobbieControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }
  forbiddenNames = ['Big Mom', 'Kaido'];

  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.notForbiddenName.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.notForbiddenEmail)
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([])
    })

    this.signUpForm.valueChanges.subscribe(value => {
      console.log(value);
    })

    this.signUpForm.statusChanges.subscribe(value => {
      console.log(value);
    })

    this.signUpForm.setValue({
      userData: {
        username: 'Gian',
        email: "demo@demo.com"
      },
      gender: 'male',
      hobbies: []
    })

    this.signUpForm.patchValue({
      userData: {
        username: 'Luffy'
      }
    })
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset();
    this.signUpForm.patchValue({
      gender: 'female'
    })
  }

  onAddHobbie() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  notForbiddenName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) != -1) {
      return { nameIsForbidden: true }
    } else {
      null
    }
  }

  notForbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.com') {
          resolve({emailIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1000)
    });

    return promise;
  }
}
