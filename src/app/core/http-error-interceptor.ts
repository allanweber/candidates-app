import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

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
        alert(errorMessage);
        return throwError(response);
      })
    );
  }
}
