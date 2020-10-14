import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CandidateApplicationAccessToken } from '../model/candidate-application-access-token.model';
import { VacancyView } from '../model/vacancy-view.model';
import { AccessTokenStorageService } from './access-token-storage.service';

const ACCESS_TOKEN_KEY = 'candidate-application-access-token';

@Injectable({
  providedIn: 'root',
})
export class VacancyViewService {

  private serverUrl = `${environment.candidatesCareer}/candidate-application`;

  constructor(
    private http: HttpClient,
    private accessTokenStorageService: AccessTokenStorageService
  ) {}

  getVacancy(applicationId: string): Observable<VacancyView> {
    return this.http.get<VacancyView>(
      `${this.serverUrl}/${applicationId}/vacancy`
    );
  }
}
