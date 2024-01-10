import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(
    private userService: UserService,
    private helpersService: HelpersService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      const { email, password, name } = this.form.value;
      this.userService.register({ name, email, password }).subscribe(
        (res) => {
          console.log(res, '....');
          this.helpersService.openSnackBar(
            'You have Succefully Registered',
            'Undo'
          );
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log('error', err);
          if (err.error.details) {
            err.error.details.forEach((err: ErrorDetail) => {
              console.log('err', err);
              this.helpersService.openSnackBar(err.message, 'Undo', {
                duration: 2000,
                panelClass: ['style-error'],
              });
            });
          }
        }
      );
    }
  }
}
