import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';

// Include the necessary imports for NB_AUTH_TOKEN_INTERCEPTOR_FILTER and NbAuthJWTInterceptor

const GUARDS = [AuthGuard];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/login', '/sign-up', '/forgot-pass'].some(url => req.url.includes(url));
}

@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    AuthRoutingModule,
    MatCardModule,
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...GUARDS,
      ],
    };
  }
}

