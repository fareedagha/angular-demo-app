import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HelpersService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { ErrorDetail } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  form: FormGroup;
  constructor(  private userService: UserService,
    private helpersService: HelpersService,
    private router: Router,
    private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMismatchValidator }
    );
  }

  submit() {
    if (this.form.valid) {
      const { email, password, name } = this.form.value;
      this.userService.register({ name, email, password }).subscribe(
        (res) => {
          console.log(res, '....');
          this.helpersService.openSnackBar(
            'You have Successfully Registered',
            'Close'
          );
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log('error', err);
          if (err.error.details) {
            err.error.details.forEach((errorDetail: ErrorDetail) => {
              console.log('err', errorDetail);
              this.helpersService.openSnackBar(errorDetail.message, 'Close', {
                duration: 2000,
                panelClass: ['style-error'],
              });
            });
          }
        }
      );
    }
  }

  passwordMismatchValidator(form: FormGroup) {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
