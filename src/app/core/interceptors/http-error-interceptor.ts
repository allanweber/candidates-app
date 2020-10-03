import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FeedbackMessageService } from './../../shared/service/feedback-message.service';
import { AuthenticationService } from './../service/authentication.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private feedbackMessage: FeedbackMessageService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((response: HttpErrorResponse) => {
        let errorMessage = response.statusText;
        if (response.status === 401) {
          this.feedbackMessage.showErrorMessage('Invalid credentials');
          this.authenticationService.logout();
        } else if (response.status === 404) {
          return throwError(response);
        } else if (response.status === 403) {
          return throwError(response);
        } else {
          if (response.error && response.error.message) {
            errorMessage = response.error.message.replace(response.status, '');
            this.feedbackMessage.showErrorMessage(errorMessage);
          }
          return throwError(response);
        }
      })
    );
  }
}
