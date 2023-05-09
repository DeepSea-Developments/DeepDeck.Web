import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uploadedDataSubject = new BehaviorSubject<any>(null);
  public uploadedData$ = this.uploadedDataSubject.asObservable();

  constructor() { }

  uploadJson(file: File) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const jsonData = JSON.parse(event.target.result);
      this.uploadedDataSubject.next(jsonData);
    };

    reader.readAsText(file);
  }
}