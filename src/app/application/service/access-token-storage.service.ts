import { Injectable } from '@angular/core';
import { CandidateApplicationAccessToken } from '../model/candidate-application-access-token.model';

const ACCESS_TOKEN_KEY = 'candidate-application-access-token';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenStorageService {
  constructor() {}

  remove(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  add(accessToken: CandidateApplicationAccessToken): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
  }

  get getToken(): CandidateApplicationAccessToken {
    return JSON.parse(sessionStorage.getItem(ACCESS_TOKEN_KEY));
  }

  hasToken(): boolean {
    return this.getToken != null;
  }

  isValid(): boolean {
    const token = this.getToken;
    return !!(token.accessToken && token.applicationId);
  }
}
