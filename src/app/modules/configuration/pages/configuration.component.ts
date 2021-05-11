import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfigService } from '../../../core/services/config/config.service';
declare let $: any;


@Component({
  selector: 'app-config',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {

  device: any = {
    "AzureConnectionString": "xxxxxx-xxxxxxxxx",
    "IDDevice": "DSD00001",
    "ModeloInversor": "CHINT",
    "IDClient": "DSD",
  }

  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {    
   
  }

  ngOnDestroy() {
   
  }

  saveConfig() {
    console.log("config", this.device);
  }

  refreshRules(value){
    
  }
}
