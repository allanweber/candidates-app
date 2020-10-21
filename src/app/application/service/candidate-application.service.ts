import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CandidateProfile } from '../../shared/model/candidate-profile.model';
import { FeedbackMessageService } from '../../shared/service/feedback-message.service';
import { CandidateApplicationAccessToken } from '../model/candidate-application-access-token.model';
import { DenyReason } from '../model/deny-reason.model';
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
      .get<any>(`${this.serverUrl}/validate-access/${access.applicationId}`, {
        headers,
      })
      .pipe(this.error());
  }

  accept(): Observable<any> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http
      .post<any>(`${this.serverUrl}/${access.applicationId}/accept`, null, {
        headers,
      })
      .pipe(this.error());
  }

  validateView(applicationId: string): Observable<any> {
    return this.http.get<any>(
      `${this.serverUrl}/${applicationId}/validate-view`
    );
  }

  deny(applicationId: string, reason: DenyReason): Observable<any> {
    return this.http.post<any>(
      `${this.serverUrl}/${applicationId}/deny`,
      reason
    );
  }

  getProfile(): Observable<CandidateProfile> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http.get<CandidateProfile>(
      `${this.serverUrl}/${access.applicationId}/profile`,
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

  getDenyReasons(): Observable<DenyReason[]> {
    return this.http.get<DenyReason[]>(`${this.serverUrl}/deny-reasons`);
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

  private getAccessHeader(
    access: CandidateApplicationAccessToken
  ): HttpHeaders {
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
