import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
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
     "ApnPassword": "",
     "FWVersion": "1.0.2",
     "Mac": "00:1B:44:11:3A:B7"
  }
   
  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    ) {

  }
    ngOnInit(): void {
      this.loadConfig();
    }
    
    loadConfig() {
      this.apiService.getCurrentConfigData(false)
      .subscribe(
        value => {
          this.network.InternetConnection = value.InternetConnection;
          this.network.WifiSSID = value.WifiSSID;
          this.network.WifiPassword = value.WifiPassword;
          this.network.Apn = value.Apn;
          this.network.ApnUser = value.ApnUser;
          this.network.ApnPassword = value.ApnPassword;
          this.network.FWVersion = value.FWVersion;
          this.network.Mac = value.Mac;
        }
      );
    } 

    formatDate(value) {
      const date = moment.utc(value);
      return moment(date).local().format('YYYY-MM-DD HH:mm');
    }

    saveNetwork(){
      this.apiService.saveNetwork(this.network).subscribe(
        data => {
          alert("Cambios guardados correctamente!")
          this.loadConfig();
        }
      )
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
