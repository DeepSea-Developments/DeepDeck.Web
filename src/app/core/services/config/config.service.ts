import { Injectable } from '@angular/core';
import {HelpersService} from "../../../shared/services/helpers.service";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private http: HttpClient,
    private helperService: HelpersService,
  ) {
  }

  getConfig(pageNumber, search): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (pageNumber) {
      params = params.set('page', pageNumber);
    }
    return this.http.get(this.helperService.getBasicApiEndpoint() + '/config', {params})
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }
  
  createConfig(data): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept-Language', 'es');
    return this.http.post<any>(this.helperService.getBasicApiEndpoint() + '/config', JSON.stringify(data), {headers}
    ).pipe(
      retry(1),
      catchError(this.errorHandl)
    );    
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