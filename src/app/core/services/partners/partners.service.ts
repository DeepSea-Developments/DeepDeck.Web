import { Injectable } from '@angular/core';
import {HelpersService} from "../../../shared/services/helpers.service";
import {HttpClient, HttpParams, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(
    private http: HttpClient,
    private helperService: HelpersService,
  ) {
  }

  getPartners(pageNumber, search): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    if (pageNumber) {
      params = params.set('page', pageNumber);
    }
    return this.http.get(this.helperService.getPublicApiEndpoint() + '/jwt/v1/partners/', {params})
      .pipe(
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