import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CandidateRegisterRoutingModule } from './candidate-register.routing';
import { DenyProfileComponent } from './deny-profile/deny-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { AcceptProfileComponent } from './accept-profile/accept-profile.component';
import { InvalidProfileComponent } from './invalid-profile/invalid-profile.component';
import { SentProfileComponent } from './sent-profile/sent-profile.component';

@NgModule({
  declarations: [DenyProfileComponent, ProfileComponent, AcceptProfileComponent, InvalidProfileComponent, SentProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateRegisterRoutingModule,
    SharedModule,
  ],
})
export class CandidateRegisterModule {}
