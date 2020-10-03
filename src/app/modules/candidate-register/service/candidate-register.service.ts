import { VacancyView } from './../../../shared/model/vacancy-view.mode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { CandidateRegisterProfile } from './../../../shared/model/candidate-register-profile.model';
import { FeedbackMessageService } from './../../../shared/service/feedback-message.service';
import { CandidateRegisterAccessToken } from './../model/candidate-register-access-token.model';
import { AccessTokenStorageService } from './access-token-storage.service';

const ACCESS_TOKEN_KEY = 'candidate-register-access-token';

@Injectable({
  providedIn: 'root',
})
export class CandidateRegisterService {
  private serverUrl = environment.candidatesCareer;

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
        `${this.serverUrl}/candidate-register/validate-access/${access.registerId}`,
        { headers }
      )
      .pipe(this.error());
  }

  getProfile(): Observable<CandidateRegisterProfile> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http.get<CandidateRegisterProfile>(
      `${this.serverUrl}/candidate-register/${access.registerId}/profile`,
      { headers }
    );
  }

  getVacancy(): Observable<VacancyView> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http.get<VacancyView>(
      `${this.serverUrl}/candidate-register/${access.registerId}/vacancy`,
      { headers }
    );
  }

  saveProfile(profile: CandidateRegisterProfile): Observable<any> {
    const access = this.validateAndGetToken();
    const headers = this.getAccessHeader(access);
    return this.http.post<any>(
      `${this.serverUrl}/candidate-register/${access.registerId}`,
      profile,
      { headers }
    );
  }

  private validateAndGetToken(): any {
    if (
      !this.accessTokenStorageService.hasToken() ||
      !this.accessTokenStorageService.isValid()
    ) {
      return throwError('Dados inválidos');
    }
    return this.accessTokenStorageService.getToken;
  }

  private getAccessHeader(access: CandidateRegisterAccessToken): HttpHeaders {
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
