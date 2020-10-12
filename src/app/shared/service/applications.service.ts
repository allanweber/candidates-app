import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CandidateApplicationResponse } from '../model/candidate-application-response.model';
import { VacancyApplication } from '../model/vacancy-application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private serverUrl = `${environment.candidatesCareer}/application`;

  constructor(private http: HttpClient) {}

  sendApplication(
    candidateId: string,
    vacancyId: string
  ): Observable<CandidateApplicationResponse> {
    return this.http.post<CandidateApplicationResponse>(
      `${this.serverUrl}/${candidateId}/send-application/${vacancyId}`,
      {}
    );
  }

  getCandidateApplications(
    candidateId: string
  ): Observable<CandidateApplicationResponse[]> {
    return this.http.get<CandidateApplicationResponse[]>(
      `${this.serverUrl}/candidates/${candidateId}/applications`
    );
  }

  getVacancyApplications(vacancyId: string): Observable<VacancyApplication[]> {
    return this.http.get<VacancyApplication[]>(
      `${this.serverUrl}/vacancy/${vacancyId}/applications`
    );
  }
}
