import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RememberMeComponent } from './remember-me/remember-me.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SocialGrantedComponent } from './social-authorization/social-granted/social-granted.component';
import { SocialDeniedComponent } from './social-authorization/social-denied/social-denied.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    EmailVerifiedComponent,
    RememberMeComponent,
    ChangePasswordComponent,
    SocialGrantedComponent,
    SocialDeniedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
})
export class AuthModule {}
