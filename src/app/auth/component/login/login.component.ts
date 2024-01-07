import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HelpersService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService,private helpersService: HelpersService, private router: Router) { }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login({email, password}).subscribe((res)=>{
        this.helpersService.openSnackBar('You have Succefully LogedIn','Undo',null)
        this.router.navigate(["/home"]);

      },err=>{
        if (err.error.details) {
          err.error.details.forEach((err:any) => {
            console.log('err', err)
            this.helpersService.openSnackBar(err.message,'Undo',{
              duration: 2000,
              panelClass: ["style-error"]
          })
            
          });
        }

      });

    }
  }
}
