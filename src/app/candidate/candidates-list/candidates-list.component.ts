import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CandidatesService } from './../service/candidates.service';
import { Component, OnInit } from '@angular/core';
import { Candidate } from '../model/candidate.model';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {
  candidates$: Observable<Candidate[]>;

  constructor(private candidatesService: CandidatesService) { }

  ngOnInit(): void {
    this.candidates$ = this.candidatesService.getAll().pipe(take(1));
  }

}
