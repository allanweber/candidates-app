import { Injectable } from '@angular/core';
import { CandidateRegisterAccessToken } from './../model/candidate-register-access-token.model';

const ACCESS_TOKEN_KEY = 'candidate-register-access-token';

@Injectable({
  providedIn: 'root',
})
export class AccessTokenStorageService {
  constructor() {}

  remove(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  add(accessToken: CandidateRegisterAccessToken): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
  }

  get getToken(): CandidateRegisterAccessToken {
    return JSON.parse(sessionStorage.getItem(ACCESS_TOKEN_KEY));
  }

  hasToken(): boolean {
    return this.getToken != null;
  }

  isValid(): boolean {
    const token = this.getToken;
    return !!(token.accessToken && token.registerId);
  }
}
