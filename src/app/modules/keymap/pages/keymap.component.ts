import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DownloadService } from './download.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from './upload.service';
import { v4 as uuidv4 } from 'uuid';

import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-config',
  templateUrl: './keymap.component.html',
  styleUrls: ['./keymap.component.scss']
})

export class KeymapComponent implements OnInit {

  macroList: any = [];
  lengthMacro: number;
  pageNumberMacro = 1;
  columndefsMacro: string[] = ['pos', 'name', 'action'];

  selectedFile: File | null;
  private uploadSubscription: Subscription | undefined;

  layerList: any = [];
  length: number;
  pageNumber = 1;
  columndefs: string[] = ['pos', 'name','active', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  layer: any;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    private downloadService: DownloadService,
    private router : Router,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.loadLayers();
    this.loadMacros();    
  }
  
  loadLayers() {
    this.apiService.getLayersName().subscribe(response => {
      this.layerList = response.data;
    });
  }

  loadMacros() {
    this.macroList = [{
      "name": "M1",
      "keys": "Layer1 + Layer 2"
    },
    {
      "name": "M2",
      "keys": "Layer2 + Layer3 + Layer1"
    }
    ]
  }

  RestoreToDefault()
  {
    this.apiService.restoreDefaultSettings().subscribe(response => {      
      // Reload the current page
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/keymap']);
      });
    });
  }

  refreshLayer(event) {

  }

  refreshMacro(event) {

  }

  openConfirmationDialog(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { element: element }, // Pass the element object
    });
  
    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        //this.delete(elementId);
      }
    });
  }

  toggleActive(element: any): void {

    this.apiService.getLayersLayout(element.uuid).subscribe(response => {      
      this.layer = response; 
      this.layer.active = !this.layer.active;
      this.layer.uuid = element.uuid;
        
      this.apiService.updateLayersLayout(this.layer).subscribe(response => {      
          // Reload the current page
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/keymap']);
          });
        })
    })
  }

  downloadJson(element:any) 
  {
    this.apiService.getLayersLayout(element.uuid).subscribe(response => {      
      this.layer = response; 
      const jsonData = this.layer;
      const filename = element.name  + '_layer.dd';
      this.downloadService.downloadJson(jsonData, filename);
    })
  }

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];
      const extension = file.name.split('.').pop();
      if (extension === 'dd') {
        this.selectedFile = file;
      } else {
        // Clear the selection if the file extension is not ".dd"
        this.selectedFile = null;
        event.target.value = null;
      }
    } else {
      this.selectedFile = null;
    }
  }


  uploadJson() 
  {
    if (this.selectedFile) {
      this.uploadSubscription = this.uploadService.uploadedData$.subscribe((jsonData) => {
        // Use the uploaded JSON data here
        console.log(jsonData);

        if(jsonData !== null)
        {
          jsonData.uuid = uuidv4().slice(0,6);
          this.apiService.createLayer(jsonData).subscribe(response => {
            console.log(response);
            // Reload the current page
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/keymap']);
            });
          })
        }
        else
        {
          alert("internal error. Try Again");
        }
      });

      this.uploadService.uploadJson(this.selectedFile);
    }
  }

  ngOnDestroy() {
    if (this.uploadSubscription) {
      this.uploadSubscription.unsubscribe();
    }
  }

}
