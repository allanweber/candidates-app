import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptProfileComponent } from './accept-profile/accept-profile.component';
import { DenyProfileComponent } from './deny-profile/deny-profile.component';
import { InvalidProfileComponent } from './invalid-profile/invalid-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { SentProfileComponent } from './sent-profile/sent-profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'denied', component: DenyProfileComponent },
  { path: 'accept/:applicationId', component: AcceptProfileComponent },
  { path: 'invalid', component: InvalidProfileComponent },
  { path: 'sent', component: SentProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateApplicationRoutingModule {}
