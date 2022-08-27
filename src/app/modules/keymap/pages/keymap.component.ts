import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';


@Component({
  selector: 'app-config',
  templateUrl: './keymap.component.html',
  styleUrls: ['./keymap.component.scss']
})

export class KeymapComponent implements OnInit {
  device: any = {
    AzureConnectionString: "",
    IDDevice: "",
    ModeloInversor: "",
    IDClient: "",
    FWVersion: "1.0.2",
    Mac: "00:1B:44:11:3A:B7"
  }

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.loadConfig();
  }

  ngOnDestroy() {

  }

  loadConfig() {
    this.apiService.getCurrentConfigData(true)
    .subscribe(
      value => {
        this.device.AzureConnectionString = value.AzureConnectionString;
        this.device.IDDevice = value.IDDevice;
        this.device.ModeloInversor = value.ModeloInversor;
        this.device.IDClient = value.IDClient;
        this.device.FWVersion = value.FWVersion;
        this.device.Mac = value.Mac;
      }
    );
  }

  saveConfig() {
    console.log("config", this.device);
  }

  saveCloud(){
    this.apiService.saveCloud(this.device).subscribe(
      data => {
        this.loadConfig();
      }
    )
  }

}
