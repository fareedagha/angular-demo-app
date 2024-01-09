import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';
import { PageModule } from './page/page.module';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './page/page.component';
import { ComponentModule } from './component/component.module';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    MaterialModule,
    HttpClientModule,
    PageModule,
    RouterModule,
    ComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
