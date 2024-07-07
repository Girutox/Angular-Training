import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statuses = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      // name: new FormControl(null, [Validators.required, this.notForbiddenProjectName]),
      name: new FormControl(null, Validators.required, this.notForbiddenProjectName),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null)
    });
  }

  // notForbiddenProjectName(control: FormControl) {
  //   if (control.value == 'Test') {
  //     return {projectNameIsForbidden: true};
  //   } else {
  //     return null;
  //   }
  // }

  notForbiddenProjectName(control: FormControl) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'Test') {
          resolve({ projectNameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    })

    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}
