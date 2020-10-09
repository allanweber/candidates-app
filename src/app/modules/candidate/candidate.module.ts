import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CandidateActionsComponent } from './candidate-actions/candidate-actions.component';
import { GithubActionsComponent } from './candidate-actions/github-actions/github-actions.component';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';
import { CandidateRoutingModule } from './candidate.routing';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidateImageComponent } from './candidate-actions/candidate-image/candidate-image.component';
import { ResumeComponent } from './candidate-actions/resume/resume.component';
import { SocialNetworksComponent } from './candidate-actions/social-networks/social-networks.component';
import { RepositoriesComponent } from './candidate-actions/repositories/repositories.component';
import { FillProfileSendComponent } from './candidate-actions/fill-profile-send/fill-profile-send.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { ProfileActionComponent } from './candidate-actions/profile-action/profile-action.component';

@NgModule({
  declarations: [
    CandidatesListComponent,
    CandidateComponent,
    CandidateAddComponent,
    CandidateActionsComponent,
    GithubActionsComponent,
    CandidateImageComponent,
    ResumeComponent,
    SocialNetworksComponent,
    RepositoriesComponent,
    FillProfileSendComponent,
    CandidateProfileComponent,
    ProfileActionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateRoutingModule,
    SharedModule,
  ],
})
export class CandidateModule {}
