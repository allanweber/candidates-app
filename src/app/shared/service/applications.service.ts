import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicationResponse } from '../model/application-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private serverUrl = `${environment.candidatesCareer}/application`;

  constructor(private http: HttpClient) {}

  sendApplication(
    candidateId: string,
    vacancyId: string
  ): Observable<ApplicationResponse> {
    return this.http.post<ApplicationResponse>(
      `${this.serverUrl}/${candidateId}/send-application/${vacancyId}`,
      {}
    );
  }

  getCandidateApplications(
    candidateId: string
  ): Observable<ApplicationResponse[]> {
    return this.http.get<ApplicationResponse[]>(
      `${this.serverUrl}/candidates/${candidateId}/applications`
    );
  }

  getVacancyApplications(vacancyId: string): Observable<ApplicationResponse[]> {
    return this.http.get<ApplicationResponse[]>(
      `${this.serverUrl}/vacancy/${vacancyId}/applications`
    );
  }
}
