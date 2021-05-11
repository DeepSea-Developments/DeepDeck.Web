import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { of, Subject, Observable, throwError, BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';

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
    this.refreshToken = localStorage.getItem('refreshToken');
    this.tokenExpiration = localStorage.getItem('tokenExpiration');
    this.backendUser = JSON.parse(localStorage.getItem('django_user'));

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
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', 'es');
    return this.http.post<any>(environment.API_URL + '/tenant/public/jwt/v1/auth/create/',
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
          console.log("Result", result);
          this.setUserData(userData);
          this.loginSubject.next(true);
          return of(userData);
        }
        return of(result.key);
      })
    );
  }

  getCurrentUserData(force): Observable<any> {
    if (this.backendUser && !force) {
      return of(this.backendUser);
    } else if (this.isLoggedIn()) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return this.http.get<any>(
        environment.API_URL + '/tenant/public/jwt/v1/account/users/me/',
        { headers }
      ).pipe(
        mergeMap(result => {
          this.setUserData(result);
          return of(result);
        })
      );
    } else {
      return throwError(new Error('Not Logged In'));
    }
  }


  getUsers(): Observable<any> {
    return this.http.get('/tenant/public/jwt/v1/auth/users/')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getClients(): Observable<any> {
    return this.http.get('/tenant/public/jwt/v1/client/')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getClient(): any {
    if (this.backendUser.clients && this.backendUser.clients.length > 0) {
      return this.backendUser.clients[0];
    }
    return null;
  }

  createUser(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', 'es');
    return this.http.post<any>('/tenant/public/jwt/v1/auth/users/', JSON.stringify(data), { headers }
    ).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  setUserData(userData): any {
    this.backendUser = userData;
    localStorage.setItem('django_user', JSON.stringify(this.backendUser));
  }

  logout(): any {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('django_user');
    this.accessToken = null;
    this.refreshToken = null;
    this.backendUser = null;
    this.logoutSubject.next(true);
    this.loginSubject.next(false);
    this.router.navigate(['/login']);
  }

  changePass(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>('/tenant/public/jwt/v1/account/users/set_password/', JSON.stringify(data), { headers }
    );

  }

  retrievePass(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>('/tenant/public/jwt/v1/account/users/reset_password/', JSON.stringify(data), { headers }
    );
  }

  retrievePassConfirm(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>('/tenant/public/jwt/v1/account/users/reset_password_confirm/', JSON.stringify(data), { headers }
    );
  }


  getSocketAuth() {
    let authSocketData = {
      "jwt": this.accessToken,
      "room": "m_cid_" + this.accessToken
    }
    return authSocketData
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
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
