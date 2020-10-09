import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from './../../shared/shared.module';
import { CandidateActionsComponent } from './candidate-actions/candidate-actions.component';
import { CandidateImageComponent } from './candidate-actions/candidate-image/candidate-image.component';
import { FillProfileSendComponent } from './candidate-actions/fill-profile-send/fill-profile-send.component';
import { GithubActionsComponent } from './candidate-actions/github-actions/github-actions.component';
import { ProfileActionComponent } from './candidate-actions/profile-action/profile-action.component';
import { RepositoriesComponent } from './candidate-actions/repositories/repositories.component';
import { ResumeComponent } from './candidate-actions/resume/resume.component';
import { SocialNetworksComponent } from './candidate-actions/social-networks/social-networks.component';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CandidateRoutingModule } from './candidate.routing';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { LastUpdateComponent } from './candidate-actions/last-update/last-update.component';

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
    LastUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateRoutingModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
})
export class CandidateModule {}
