import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DenyProfileComponent } from './deny-profile/deny-profile.component';
import { InvalidProfileComponent } from './invalid-profile/invalid-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { SentProfileComponent } from './sent-profile/sent-profile.component';
import { ViewApplicationComponent } from './view-application/view-application.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'denied', component: DenyProfileComponent },
  { path: 'view/:applicationId', component: ViewApplicationComponent },
  { path: 'invalid', component: InvalidProfileComponent },
  { path: 'sent', component: SentProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateApplicationRoutingModule {}
