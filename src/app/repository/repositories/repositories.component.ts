import { PaginationConfig } from './../../shared/components/pagination/model/pagination-config.model';
import { Repository } from './../../shared/model/repository.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { RepositoryCounter } from './../../shared/model/repository-counter.model';
import { CandidateRepositoriesService } from './../../shared/service/candidate-repositories.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  candidateId: string;
  repositoryCounter: RepositoryCounter;
  repositories$: Observable<Repository[]>;
  paginationConfig: PaginationConfig;
  currentOffset: number;
  currentSortBy: string;
  private pageSize = 9;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private candidateRepositoriesService: CandidateRepositoriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      if (params.id) {
        this.candidateId = params.id;
        this.getRepositoryCounter();
        this.currentOffset = 0;
        this.currentSortBy = 'name';
        this.loadRepositories();
      } else {
        this.router.navigate(['/candidates']);
      }
    });
  }

  getRepositoryCounter(): void {
    this.candidateRepositoriesService
      .count(this.candidateId)
      .pipe(take(1))
      .subscribe(
        (counter) => {
          this.repositoryCounter = counter;
          this.paginationConfig = {
            total: counter.repositories,
            pageSize: this.pageSize,
          };
        },
        () =>
          this.router.navigate(['candidates', this.candidateId, 'candidate'])
      );
  }

  loadRepositories(): void {
    this.repositories$ = this.candidateRepositoriesService
      .getRepositories(
        this.candidateId,
        this.pageSize,
        this.currentOffset,
        this.currentSortBy
      )
      .pipe(take(1));
  }

  sortChanged(sortBy: string): void {
    this.currentSortBy = sortBy;
    this.loadRepositories();
  }

  pageChanged(page: number): void {
    this.currentOffset = page;
    this.loadRepositories();
  }

  isSortActive(sortBy: string): boolean {
    return this.currentSortBy === sortBy;
  }
}
