import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface DialogData {
  cost: string;
  quantity: string;
  type: string;
  reason: string;
  product: string;
  productList: string;
  reaseon: string;
  reasonList: string;
}


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent implements OnInit {

  config: any = {
    "DeviceName": "",
    "AzureConnectionString": "",
    "IDDevice": "",
    "ModeloInversor": "",
    "IDClient": "",
    "InternetConnection": 0,
    "SupportedInternetConnectionTypes": "", 
    "WifiSSID": "",
    "WifiPassword": "",
    "Apn": "",
    "ApnUser": "",
    "ApnPassword": "",
    "HWDeviceType": 0,
    "SupportedHWDeviceTypes":"",
    "HWDeviceInterfaces": "",
    "SupportedHWInterfaces": "",
    "HWInterfacesInformation": "",
    "DeviceBaudrate": 115200,
    "ModbusAddress": "",
    "ModbusTCPAddress": "255.255.254.254",
    "FWVersion": "1.0.2",
    "Mac": "00:1B:44:11:3A:B7"
  }
  
  device: any = {    
      "DeviceBaudrate": 115200,
      "ModbusAddress": 1,
      "ModbusTCPAddress": "255.255.255.255"
    }
        
  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    ) {

  }

    ngOnInit(): void { 
      this.apiService.getCurrentConfigData(false)
      .subscribe(
        value => {
          this.device.DeviceBaudrate = value.DeviceBaudrate;
          this.device.ModbusAddress = value.ModbusAddress;
          this.device.ModbusTCPAddress = value.ModbusTCPAddress;
          for (let key in value) {
            this.config[key] = value[key];
          }
        }
      );
     }

    formatDate(value) {
      const date = moment.utc(value);
      return moment(date).local().format('YYYY-MM-DD HH:mm');
    }

    refreshModels(value) {  }
    
    openDialog(): void {  }

    saveConfig() {
      this.apiService.saveDevice(this.device).subscribe(
        data => {
        }
      )
    }
}

@Component({
  selector: 'dialog-inventory',
  templateUrl: 'dialog-inventory.html',
})
export class DialogOverviewInventoryDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }  

}
