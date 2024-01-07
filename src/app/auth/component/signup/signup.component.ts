import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private authService: AuthService) { }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      const { email, password, name } = this.form.value;
      this.authService.register({ name, email, password }).subscribe(res=>{
        console.log(res,'....')
      });

    }
  }
}
