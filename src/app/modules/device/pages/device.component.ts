import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { InventoryService } from '../../../core/services/inventory/inventory.service';


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
    "ModbusTCPAddress": "",
    "FWVersion": "1.0.2",
    "Mac": "00:1B:44:11:3A:B7"
  }
  
  device: any = {    
      "DeviceBaudrate": 115200,
      "ModbusAddress": 1,
      "ModbusTCPAddress": "255.255.255.255",
      "HWDeviceType": 0
    }
        
  constructor(public dialog: MatDialog, private inventoryService:InventoryService) {

  }

    ngOnInit(): void { }

    formatDate(value) {
      const date = moment.utc(value);
      return moment(date).local().format('YYYY-MM-DD HH:mm');
    }

    refreshModels(value) {  }
    
    openDialog(): void {  }

    saveConfig() {
      console.log("config", this.device);
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
