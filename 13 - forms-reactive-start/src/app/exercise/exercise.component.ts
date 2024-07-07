import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  statuses = ['Satble', 'Critical', 'Finished'];
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(null, [Validators.required, this.notForbiddenProjectName]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null, Validators.required)
    });
  }

  notForbiddenProjectName(control: FormControl) {
    if (control.value == 'Test') {
      return {projectNameIsForbidden: true};
    } else {
      return null;
    }
  }

  onSubmit() {
    console.log(this.projectForm.value);    
  }
}
