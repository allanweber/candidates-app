import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CandidateRepositoriesService } from './../../../../shared/service/candidate-repositories.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  @Input() candidateId: string;
  repositoriesCount = 0;

  constructor(
    private candidateRepositoriesService: CandidateRepositoriesService
  ) {}

  ngOnInit(): void {
    this.candidateRepositoriesService
      .count(this.candidateId)
      .pipe(take(1))
      .subscribe((response) => (this.repositoriesCount = response));
  }

  getColor(): string {
    if (this.repositoriesCount <= 0) {
      return 'hsl(0, 0%, 4%)';
    } else {
      return 'hsl(141, 71%, 48%)';
    }
  }
}
