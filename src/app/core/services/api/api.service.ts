import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public currentConfig: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentConfig = JSON.parse(localStorage.getItem('current_config'));
  }

  saveNetwork(data): Observable<any> {
    //let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'application/json');
    // headers = headers.set('Accept-Language', 'es');
    return this.http.post<any>(
      'http://192.168.4.1/api/connect',
      JSON.stringify(data),
    ).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  saveCloud(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', 'es');
    return this.http.post<any>(
      '/save-cloud/',
      JSON.stringify(data),
      { headers }
    ).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  saveDevice(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', 'es');
    return this.http.post<any>(
      '/save-device/',
      JSON.stringify(data),
      { headers }
    ).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  resetDevice(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', 'es');
    return this.http.post<any>(
      '/reset/',
      JSON.stringify(data),
      { headers }
    ).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  getCurrentConfigData(force): Observable<any> {
    if (this.currentConfig && !force) {
      return of(this.currentConfig);
    } else {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Accept-Language', 'es');
      // TODO Delete after local tests
      return this.http.get<any>('/config/',
        { headers }
      ).pipe(
        mergeMap(result => {
          const configData = result;
          this.setConfigData(configData);
          return of(configData);
        })
      );
    }
  }

  setConfigData(configData): any {
    this.currentConfig = configData;
    localStorage.setItem('current_config', JSON.stringify(this.currentConfig));
  }

  getLayersName(): Observable<any> {
    // TODO Delete after local tests
    return this.http.get<any>('http://192.168.1.12/api/layers/layer_names').pipe(
      retry(1),
      catchError(this.errorHandl)
    ); 
  }

  
  getLayersLayout(uuid, pos): Observable<any> {
    let params = new HttpParams();
    
    if (uuid) {
      params = params.set('uuid', uuid);
      params = params.set('pos', pos);
    }

    // TODO Delete after local tests
    return this.http.get<any>('http://192.168.1.12/api/layers', {params}).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateLayersLayout(data): Observable<any> {        
    // TODO Delete after local tests
    return this.http.put<any>('http://192.168.1.12/api/layers',  JSON.stringify(data)).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

   createLayer(data): Observable<any> {    
    return this.http.post<any>( 'http://192.168.1.12/api/layers', JSON.stringify(data),).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  cleanData(): any {
    localStorage.removeItem('current_config');
    this.currentConfig = null;
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
