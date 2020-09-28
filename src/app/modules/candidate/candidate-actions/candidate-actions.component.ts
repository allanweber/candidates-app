import { Candidate } from './../model/candidate.mode';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-actions',
  templateUrl: './candidate-actions.component.html',
  styleUrls: ['./candidate-actions.component.scss'],
})
export class CandidateActionsComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() {}

  ngOnInit(): void {}
}
