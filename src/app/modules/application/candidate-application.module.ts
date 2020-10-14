import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CandidateApplicationRoutingModule } from './candidate-application.routing';
import { DenyProfileComponent } from './deny-profile/deny-profile.component';
import { InvalidProfileComponent } from './invalid-profile/invalid-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { SentProfileComponent } from './sent-profile/sent-profile.component';
import { VacancyViewComponent } from './vacancy-view/vacancy-view.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { DenyOptionComponent } from './deny-option/deny-option.component';

@NgModule({
  declarations: [
    DenyProfileComponent,
    ProfileComponent,
    ViewApplicationComponent,
    InvalidProfileComponent,
    SentProfileComponent,
    VacancyViewComponent,
    DenyOptionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateApplicationRoutingModule,
    SharedModule,
  ],
})
export class CandidateApplicationModule {}
