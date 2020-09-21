import { RefreshTokenResponse } from './../model/refresh-token-response.model';
import { LoginResponse } from './../model/login-response.mode';
import { TokenStorageService } from '../../core/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthUser } from './../model/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<AuthUser>({} as AuthUser);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private serverUrl = environment.candidatesCareer;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  populate(): void {
    if (this.tokenStorage.token) {
      this.isAuthenticatedSubject.next(true);
      this.getAuthUser();
    } else {
      this.purgeAuth();
    }
  }

  authenticate(credentials): void {
    this.http
      .post<LoginResponse>(
        `${this.serverUrl}/auth/login`,
        credentials,
        this.httpOptions
      )
      .subscribe((response) => {
        if (response && response.token != null) {
          this.setAuth(response);
          this.router.navigate(['/']);
        }
      });
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.purgeAuth();
    this.router.navigate(['/auth/signIn']);
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http.get<RefreshTokenResponse>(
      `${this.serverUrl}/auth/refreshToken`
    );
  }

  private getAuthUser(): void {
    this.http
      .get<AuthUser>(`${this.serverUrl}/auth/auth-user`)
      .subscribe((response) => this.currentUserSubject.next(response));
  }

  private purgeAuth(): void {
    this.currentUserSubject.next({} as AuthUser);
    this.isAuthenticatedSubject.next(false);
  }

  private setAuth(response: LoginResponse): void {
    this.tokenStorage.saveTokenDate(response);
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }
}
