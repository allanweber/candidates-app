import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'signIn', pathMatch: 'full' },
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'email-verified', component: EmailVerifiedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
