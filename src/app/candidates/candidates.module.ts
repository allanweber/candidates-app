import { CandidatesRoutingModule } from './candidates.routing';
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
    CandidatesRoutingModule,
  ],
})
export class CandidatesModule {}
