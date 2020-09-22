import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';

const routes: Routes = [
  { path: '', component: CandidatesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidateRoutingModule {}
