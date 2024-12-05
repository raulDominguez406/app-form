import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule, // Include AppRoutingModule here
    LoginComponent,
  ],
  providers: [],
  exports: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
