import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { RememberMeComponent } from './remember-me/remember-me.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SocialDeniedComponent } from './social-authorization/social-denied/social-denied.component';
import { SocialGrantedComponent } from './social-authorization/social-granted/social-granted.component';

const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' },
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'email-verified', component: EmailVerifiedComponent },
  { path: 'remember-me', component: RememberMeComponent },
  { path: 'change-password/:hash', component: ChangePasswordComponent },
  { path: 'social-granted', component: SocialGrantedComponent },
  { path: 'social-denied', component: SocialDeniedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
