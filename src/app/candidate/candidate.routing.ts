import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';

const routes: Routes = [
  { path: '', component: CandidatesListComponent },
  { path: ':id/candidate', component: CandidateComponent },
  { path: ':id/candidate/profile', component: CandidateProfileComponent },
  { path: 'adicionar', component: CandidateAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
