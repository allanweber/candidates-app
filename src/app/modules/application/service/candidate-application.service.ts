import { VacancyView } from '../../../shared/model/vacancy-view.mode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CandidateProfile } from '../../../shared/model/candidate-profile.model';
import { FeedbackMessageService } from '../../../shared/service/feedback-message.service';
import { CandidateApplicationAccessToken } from '../model/candidate-application-access-token.model';
import { AccessTokenStorageService } from './access-token-storage.service';

const ACCESS_TOKEN_KEY = 'candidate-application-access-token';

@Injectable({
  providedIn: 'root',
})
export class CandidateApplicationService {
  private serverUrl = `${environment.candidatesCareer}/candidate-application`;

  constructor(
    private http: HttpClient,
    private accessTokenStorageService: AccessTokenStorageService,
    private messageService: FeedbackMessageService
  ) {}

  validateAccess(): Observable<any> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http
      .get<any>(
        `${this.serverUrl}/validate-access/${access.applicationId}`,
        { headers }
      )
      .pipe(this.error());
  }

  getProfile(): Observable<CandidateProfile> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http.get<CandidateProfile>(
      `${this.serverUrl}/${access.applicationId}/profile`,
      { headers }
    );
  }

  getVacancy(): Observable<VacancyView> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http.get<VacancyView>(
      `${this.serverUrl}/${access.applicationId}/vacancy`,
      { headers }
    );
  }

  saveProfile(profile: CandidateProfile): Observable<any> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http.post<any>(
      `${this.serverUrl}/${access.applicationId}`,
      profile,
      { headers }
    );
  }

  private validateAndGetToken(): CandidateApplicationAccessToken {
    if (
      !this.accessTokenStorageService.hasToken() ||
      !this.accessTokenStorageService.isValid()
    ) {
      throwError('Dados inválidos');
    }
    return this.accessTokenStorageService.getToken;
  }

  private getAccessHeader(access: CandidateApplicationAccessToken): HttpHeaders {
    return new HttpHeaders().set(ACCESS_TOKEN_KEY, access.accessToken);
  }

  private error(): any {
    return catchError((err) => {
      if (err.error.message) {
        this.messageService.showErrorMessage(err.error.message);
      }
      return throwError(err);
    });
  }
}
