import { Repository } from './../model/repository.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { RepositoryCounter } from './../model/repository-counter.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateRepositoriesService {
  private serverUrl = `${environment.candidatesCareer}/candidates`;

  constructor(private http: HttpClient, private router: Router) {}

  count(candidateId: string): Observable<RepositoryCounter> {
    return this.http.get<RepositoryCounter>(
      `${this.serverUrl}/${candidateId}/repositories/count`
    );
  }

  getRepositories(
    candidateId: string,
    pageSize: number,
    offset: number,
    sortBy: string
  ): Observable<Repository[]> {
    return this.http
      .get<Repository[]>(
        `${this.serverUrl}/${candidateId}/repositories?offset=${offset}&size=${pageSize}&sort=${sortBy}`
      )
      .pipe(this.error(candidateId));
  }

  private error(candidateId: string): any {
    return catchError((err) => {
      this.router.navigate(['candidates', candidateId, 'candidate']);
      return throwError(err);
    });
  }
}
