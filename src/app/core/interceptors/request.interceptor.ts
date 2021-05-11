import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';

import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse,
  HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private injector: Injector,
    private router: Router,
  ) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'JWT ' + token } });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authService = this.injector.get(AuthService);
    const token = authService.getAccessToken();

    if (token) {
      return next.handle(this.addToken(req, token)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error && error.error && error.error.code === 'token_not_valid') {

              // Handle Access token expired
              if (error.error.detail === 'Given token not valid for any token type') {
                return this.handleTokenRefresh(req, next);
              }
              // Handle Request token expired
              else if (error.error.detail === 'Token is invalid or expired') {
                return this.logoutUser();
              }
              else{
                return observableThrowError(error);
              }
            }
          } else {
            return observableThrowError(error);
          }
        })
        );
    }
    else {
      return next.handle(req);
    }
  }

  handleTokenRefresh(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      const authService = this.injector.get(AuthService);

      return authService.refreshAccessToken().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        }),
        catchError(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logoutUser();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        }),
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(req, token));
        }));
    }

  }

  logoutUser() {
    const authService = this.injector.get(AuthService);
    authService.logout();
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
    // Route to the login page (implementation up to you)
    return observableThrowError('');
  }
}