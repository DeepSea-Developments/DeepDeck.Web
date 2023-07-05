import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, retry} from 'rxjs/operators';


interface JsonLayer {
  name: string;
  active: boolean;
  uuid?: string
  row0: {
    name: string;
    keycode: number;
  }[];
  row1: {
    name: string;
    keycode: number;
  }[];
  row2: {
    name: string;
    keycode: number;
  }[];
  left_encoder_map: {
    cw: number;
    ccw: number;
    single_press: number;
    long_press: number;
    double_press: number;
  };
  right_encoder_map: {
    cw: number;
    ccw: number;
    single_press: number;
    long_press: number;
    double_press: number;
  };
  gesture_map:	{
		up:	number,
		down:	number,
		left:	number,
		right:	number,
		near:	number,
		far:	number
	}
}

function validateJsonLayer(jsonData: any, uuid_needed: boolean): jsonData is JsonLayer {
  if (typeof jsonData !== 'object' || jsonData === null) {
    return false;
  }

  // Check name
  if (
    !jsonData.hasOwnProperty('name') ||
    typeof jsonData.name !== 'string' ||
    jsonData.name.trim() === ''
  ) {
    console.log("Not valid layer json. Name missing");
    return false;
  }
  // check active
  if ( 
    !jsonData.hasOwnProperty('active') ||
    typeof jsonData.active !== 'boolean'
  ) {
    console.log("Not valid layer json. Active missing");
    return false;
  }
  // check UUID
  if ( uuid_needed && (
    !jsonData.hasOwnProperty('uuid') ||
    typeof jsonData.name !== 'string' ||
    jsonData.name.trim() === '')
  ) {
    console.log("Not valid layer json. UUID missing");
    return false;
  }

  // -----------------------Check that row0 is an array
  if (!jsonData.hasOwnProperty('row0') || !Array.isArray(jsonData.row0) || jsonData.row0.length === 0) {
    console.log("Not valid layer json. Row0 missing");
    return false;
  }
  // Check that row0 lenght
  if (jsonData.row0.length !== 4) {
    console.log("Not valid layer json. Row0 does not have 4 elements");
    return false;
  }
  // Check that row0 elements are ok
  for (const key of jsonData.row0) {
    if (
      typeof key !== 'object' ||
      key === null ||
      !key.hasOwnProperty('name') ||
      !key.hasOwnProperty('key_code') ||
      typeof key.name !== 'string' ||
      key.name.trim() === '' ||
      typeof key.key_code !== 'number'
    ) {
      console.log("Not valid layer json. Key on row0 not valid");
      return false;
    }
  }

  // -----------------   Check that row1 is an array
  if (!jsonData.hasOwnProperty('row1') || !Array.isArray(jsonData.row1) || jsonData.row1.length === 0) {
    console.log("Not valid layer json. Row1 missing");
    return false;
  }
  // Check that row1 lenght
  if (jsonData.row1.length !== 4) {
    console.log("Not valid layer json. Row1 does not have 4 elements");
    return false;
  }
  // Check that row1 elements are ok
  for (const key of jsonData.row1) {
    if (
      typeof key !== 'object' ||
      key === null ||
      !key.hasOwnProperty('name') ||
      !key.hasOwnProperty('key_code') ||
      typeof key.name !== 'string' ||
      key.name.trim() === '' ||
      typeof key.key_code !== 'number'
    ) {
      console.log("Not valid layer json. Key on row1 not valid");
      return false;
    }
  }

  // -----------------   Check that row2 is an array
  if (!jsonData.hasOwnProperty('row2') || !Array.isArray(jsonData.row2) || jsonData.row2.length === 0) {
    console.log("Not valid layer json. Row2 missing");
    return false;
  }
  // Check that row2 lenght
  if (jsonData.row2.length !== 4) {
    console.log("Not valid layer json. Row2 does not have 4 elements");
    return false;
  }
  // Check that row2 elements are ok
  for (const key of jsonData.row2) {
    if (
      typeof key !== 'object' ||
      key === null ||
      !key.hasOwnProperty('name') ||
      !key.hasOwnProperty('key_code') ||
      typeof key.name !== 'string' ||
      key.name.trim() === '' ||
      typeof key.key_code !== 'number'
    ) {
      console.log("Not valid layer json. Key on row2 not valid");
      return false;
    }
  }

  // -----------------   Check that row3 is an array
  if (!jsonData.hasOwnProperty('row3') || !Array.isArray(jsonData.row3) || jsonData.row3.length === 0) {
    console.log("Not valid layer json. Row3 missing");
    return false;
  }
  // Check that row3 lenght
  if (jsonData.row3.length !== 4) {
    console.log("Not valid layer json. Row3 does not have 4 elements");
    return false;
  }
  // Check that row3 elements are ok
  for (const key of jsonData.row3) {
    if (
      typeof key !== 'object' ||
      key === null ||
      !key.hasOwnProperty('name') ||
      !key.hasOwnProperty('key_code') ||
      typeof key.name !== 'string' ||
      key.name.trim() === '' ||
      typeof key.key_code !== 'number'
    ) {
      console.log("Not valid layer json. Key on row3 not valid");
      return false;
    }
  }

  // Check right_encoder_map

  if (
    typeof jsonData.right_encoder_map !== 'object' ||
    jsonData.right_encoder_map === null ||
    !jsonData.right_encoder_map.hasOwnProperty('cw') ||
    !jsonData.right_encoder_map.hasOwnProperty('ccw') ||
    !jsonData.right_encoder_map.hasOwnProperty('single_press') ||
    !jsonData.right_encoder_map.hasOwnProperty('long_press') ||
    !jsonData.right_encoder_map.hasOwnProperty('double_press') ||
    typeof jsonData.right_encoder_map.cw !== 'number' ||
    typeof jsonData.right_encoder_map.ccw !== 'number' ||
    typeof jsonData.right_encoder_map.single_press !== 'number' ||
    typeof jsonData.right_encoder_map.long_press !== 'number' ||
    typeof jsonData.right_encoder_map.double_press !== 'number'
  ) {
    console.log("Not valid layer json. right_encoder_map not valid");
    return false;
  }

  // Check left_encoder_map

  if (
    typeof jsonData.left_encoder_map !== 'object' ||
    jsonData.left_encoder_map === null ||
    !jsonData.left_encoder_map.hasOwnProperty('cw') ||
    !jsonData.left_encoder_map.hasOwnProperty('ccw') ||
    !jsonData.left_encoder_map.hasOwnProperty('single_press') ||
    !jsonData.left_encoder_map.hasOwnProperty('long_press') ||
    !jsonData.left_encoder_map.hasOwnProperty('double_press') ||
    typeof jsonData.left_encoder_map.cw !== 'number' ||
    typeof jsonData.left_encoder_map.ccw !== 'number' ||
    typeof jsonData.left_encoder_map.single_press !== 'number' ||
    typeof jsonData.left_encoder_map.long_press !== 'number' ||
    typeof jsonData.left_encoder_map.double_press !== 'number'
  ) {
    console.log("Not valid layer json. left_encoder_map not valid");
    return false;
  }

   // Check gesture_map
  if (
    typeof jsonData.gesture_map !== 'object' ||
    jsonData.gesture_map === null ||
    !jsonData.gesture_map.hasOwnProperty('up') ||
    !jsonData.gesture_map.hasOwnProperty('down') ||
    !jsonData.gesture_map.hasOwnProperty('left') ||
    !jsonData.gesture_map.hasOwnProperty('right') ||
    !jsonData.gesture_map.hasOwnProperty('near') ||
    !jsonData.gesture_map.hasOwnProperty('far') ||
    typeof jsonData.gesture_map.up !== 'number' ||
    typeof jsonData.gesture_map.down !== 'number' ||
    typeof jsonData.gesture_map.left !== 'number' ||
    typeof jsonData.gesture_map.right !== 'number' ||
    typeof jsonData.gesture_map.near !== 'number' ||
    typeof jsonData.gesture_map.far !== 'number'
  ) {
    console.log("Not valid layer json. gesture_map not valid");
    return false;
  }

  console.log("Valid layer json. OK");
  return true;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public currentConfig: any;
  public ipAddress: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentConfig = JSON.parse(localStorage.getItem('current_config'));
    this.ipAddress =  localStorage.getItem('ipAddress');
    // this.ipAddress =  '192.168.4.1';
    console.log(this.ipAddress);
  }

  updateIP(IP:string){
    this.ipAddress =  IP;
  }

  validateJsonLayer(jsonData: any, uuid_needed: boolean) {
    return validateJsonLayer(jsonData, uuid_needed);
  }
 
  saveNetwork(data): Observable<any> {    
    return this.http.post<any>(`http://${this.ipAddress}/api/connect`, JSON.stringify(data),).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  deleteElement(uuid: string): Observable<any> {
    const url = `http://${this.ipAddress}/api/layers?uuid=${uuid}`;
  
    console.log('Sending DELETE request to:', url);
  
    return this.http.delete<any>(url).pipe(
      //retry(1),
      //catchError((error) => {
      //  console.error('Error in deleteElement:', error);
      //  return of({ success: false, message: 'Error deleting the element.' });
      //}
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // saveCloud(data): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   headers = headers.set('Accept-Language', 'es');
  //   return this.http.post<any>(
  //     '/save-cloud/',
  //     JSON.stringify(data),
  //     { headers }
  //   ).pipe(
  //     retry(1),
  //     catchError(this.errorHandl)
  //   );
  // }

  // saveDevice(data): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   headers = headers.set('Accept-Language', 'es');
  //   return this.http.post<any>(
  //     '/save-device/',
  //     JSON.stringify(data),
  //     { headers }
  //   ).pipe(
  //     retry(1),
  //     catchError(this.errorHandl)
  //   );
  // }

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
      return this.http.get<any>(`http://${this.ipAddress}/api/config`).pipe(
        mergeMap(result => {
          const configData = result;
          this.setConfigData(configData);
          return of(configData);
        })
        // retry(1),
        // catchError(this.errorHandl)
      );
    }
  }

  setConfigData(configData): any {
    this.currentConfig = configData;
    localStorage.setItem('current_config', JSON.stringify(this.currentConfig));
  }

  getLayersName(): Observable<any> {
    // TODO Delete after local tests
    return this.http.get<any>(`http://${this.ipAddress}/api/layers/layer_names`).pipe(
      retry(1),
      catchError(this.errorHandl)
    ); 
  }

  getLayersLayout(uuid): Observable<any> {
    let params = new HttpParams();
    
    if (uuid) {
      params = params.set('uuid', uuid);
    }

    // TODO Delete after local tests
    return this.http.get<any>(`http://${this.ipAddress}/api/layers`, {params}).pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  updateLayersLayout(data): Observable<any> {        
    if(validateJsonLayer(data,true))
    {
      return this.http.put<any>(`http://${this.ipAddress}/api/layers`,  JSON.stringify(data)).pipe(
      retry(1),
      catchError(this.errorHandl)
      );
    }
    alert("Internal error: Layer json not valid")
  }

  restoreDefaultSettings(): Observable<any> {        
      return this.http.put<any>(`http://${this.ipAddress}/api/layers/restore`, null).pipe(
      retry(1),
      catchError(this.errorHandl)
      );
  }

   createLayer(data): Observable<any> {  
    if(validateJsonLayer(data,true))
    {
      return this.http.post<any>( `http://${this.ipAddress}/api/layers`, JSON.stringify(data),).pipe(
      retry(1),
      catchError(this.errorHandl)
      );
    } 
    alert("Internal error: Layer json not valid")
    
  }

  cleanData(): any {
    localStorage.removeItem('current_config');
    this.currentConfig = null;
  }

  getMacros(): Observable<any> {
    return this.http.get<any>(`http://${this.ipAddress}/api/macros`).pipe(
      retry(1),
      catchError(this.errorHandl)
    ); 
  }

  updateMacro(data): Observable<any> {
    return this.http.put<any>(`http://${this.ipAddress}/api/macros`,  JSON.stringify(data)).pipe(
      retry(1),
      catchError(this.errorHandl)
    ); 
  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      alert(errorMessage);
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      alert(errorMessage);
    }
    return throwError(errorMessage);
  }
}
