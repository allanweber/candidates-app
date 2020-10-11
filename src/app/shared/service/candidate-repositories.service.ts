import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { RepositoryCounter } from './../model/repository-counter.model';

@Injectable({
  providedIn: 'root',
})
export class CandidateRepositoriesService {
  private serverUrl = environment.candidatesCareer;

  constructor(private http: HttpClient) {}

  count(candidateId: string): Observable<RepositoryCounter> {
    return this.http.get<RepositoryCounter>(
      `${this.serverUrl}/candidates/${candidateId}/repositories/count`
    );
  }
}
