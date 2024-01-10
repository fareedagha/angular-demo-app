import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HelpersService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ErrorDetail } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private helpersService: HelpersService,
    private router: Router
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),

    ]),
  });

  submit() {

    Object.values(this.form.controls).forEach((control) => control.markAsTouched());
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login({ email, password }).subscribe(
        (res) => {
          console.log('res', res);
          if (res?.user) {
            this.dataService.setData(res.user);
          }
          this.helpersService.openSnackBar(
            'You have Succefully LogedIn',
            'Undo',
            {
              duration: 6000,
            }
          );
          this.router.navigate(['/pages/products']);
        },
        (err) => {
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
