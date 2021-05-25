import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';


@Component({
  selector: 'app-config',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
  device: any = {
    AzureConnectionString: "xxxxxx-xxxxxxxxx",
    IDDevice: "DSD00001",
    ModeloInversor: "CHINT",
    IDClient: "DSD",
  }

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiService.getCurrentConfigData(false)
      .subscribe(
        value => {
          this.device.AzureConnectionString = value.AzureConnectionString;
          this.device.IDDevice = value.IDDevice;
          this.device.ModeloInversor = value.ModeloInversor;
          this.device.IDClient = value.IDClient;
        }
      );
  }

  ngOnDestroy() {

  }

  saveConfig() {
    console.log("config", this.device);
  }

  saveCloud(){
    this.apiService.saveCloud(this.device).subscribe(
      data => {
      }
    )
  }

}
