import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateRepositoriesService {
  private serverUrl = environment.candidatesCareer;

  constructor(private http: HttpClient) {}

  count(candidateId: string): Observable<number> {
    return this.http.get<number>(`${this.serverUrl}/candidates/${candidateId}/repositories/count`);
  }
}
