import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HelpersService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ErrorDetail } from 'src/app/interfaces/auth';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private helpersService: HelpersService,
    private router: Router
  ) {}
  linkSent = false;
  message: string =
    "Check your inbox for the new password. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address";
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      const { email } = this.form.value;
      this.authService.forgotPassword({ email }).subscribe(
        (res) => {
          this.linkSent = true;
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
