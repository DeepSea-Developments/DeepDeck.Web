import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { of, Subject, Observable, throwError, BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public logoutSubject: any;
  public loginSubject: any;
  public backendUser: any;
  public accessToken: string;
  public refreshToken: string;
  public tokenExpiration: string;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.accessToken = localStorage.getItem('accessToken');

    this.logoutSubject = new Subject();
    this.loginSubject = new Subject();
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  refreshAccessToken(): Observable<string> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const refresh = {
      refresh: this.refreshToken,
    };

    return this.http.post<any>('/tenant/public/jwt/v1/auth/jwt/refresh/',
      JSON.stringify(refresh),
      { headers }
    ).pipe(
      mergeMap(result => {
        if (result.access) {
          this.accessToken = result.access;
          localStorage.setItem('accessToken', this.accessToken);
        }
        return of(result.access);
      })
    );
  }

  login(data): Observable<any> {
    /*let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', 'es');
    // TODO Delete after local tests
    return this.http.post<any>('/login/',
      JSON.stringify(data),
      { headers }
    ).pipe(
      mergeMap(result => {
        if (result.access && result.refresh) {
          this.accessToken = result.access;
          this.refreshToken = result.refresh;
          localStorage.setItem('accessToken', this.accessToken);
          localStorage.setItem('refreshToken', this.refreshToken);
          const userData = result.user;
          this.setUserData(userData);
          this.loginSubject.next(true);
          return of(userData);
        }
        return of(result.key);
      })
    );*/
    this.accessToken = data.ip;
    localStorage.setItem('accessToken', data.ip);          
    return of(true);
  }



  /*getCurrentUserData(force): Observable<any> {
    if (this.backendUser && !force) {
      return of(this.backendUser);
    } else {
      return throwError(new Error('Not Logged In'));
    }
  }*/




  setUserData(userData): any {
    this.backendUser = userData;
    localStorage.setItem('current_user', JSON.stringify(this.backendUser));
  }



  logout(): any {
    localStorage.removeItem('accessToken');
    this.accessToken = null;
    this.refreshToken = null;
    this.backendUser = null;
    this.logoutSubject.next(true);
    this.loginSubject.next(false);
    this.router.navigate(['/login']);
  }



  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
