import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from '../../../core/services/config/config.service';
import * as moment from 'moment';

export interface DialogData {
  id: string;
  name: string; 
}

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})

export class NetworkComponent implements OnInit {



  network: any = {
    "InternetConnection": 0,
    "WifiSSID" : "",
    "WifiPassword" : "",
    "Apn": "",
     "ApnUser": "",
     "ApnPassword": ""
  }
   
  constructor(public dialog: MatDialog, private billsService:ConfigService) {

  }
    ngOnInit(): void {   
     
    }
    
    refreshModels(value) {

    }
    
    formatDate(value) {
      const date = moment.utc(value);
      return moment(date).local().format('YYYY-MM-DD HH:mm');
    }
  
}

@Component({
  selector: 'dialog-models',
  templateUrl: 'dialog-models.html',
})
export class DialogOverviewModelsDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewModelsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }  

}
