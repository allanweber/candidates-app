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

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private feedbackMessage: FeedbackMessageService) {}

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
        if (response.status === 401 || response.status === 403) {
          errorMessage = 'Invalid credentials';
        } else {
          if (response.error && response.error.message) {
            errorMessage = response.error.message.replace(response.status, '');
          }
        }
        this.feedbackMessage.showErrorMessage(errorMessage);
        return throwError(response);
      })
    );
  }
}
