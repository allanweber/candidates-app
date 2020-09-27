import { CandidateComponent } from './candidate/candidate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';

const routes: Routes = [
  { path: '', component: CandidatesListComponent },
  { path: ':id/candidate', component: CandidateComponent },
  { path: 'adicionar', component: CandidateAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
