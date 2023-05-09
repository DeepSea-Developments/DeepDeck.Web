import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  downloadJson(data: any, filename: string) {
    const jsonContent = JSON.stringify(data);
    const blob = new Blob([jsonContent], { type: 'application/json' });

    // Create a temporary anchor element
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = filename;

    // Simulate a click on the anchor element to trigger the download
    element.click();

    // Clean up resources
    URL.revokeObjectURL(element.href);
    element.remove();
  }
}
