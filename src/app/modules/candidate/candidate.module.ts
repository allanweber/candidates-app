import { CandidateRoutingModule } from './candidate.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';

@NgModule({
  declarations: [CandidatesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidateRoutingModule,
  ],
})
export class CandidateModule {}
