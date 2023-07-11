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
    "ssid": "",
    "pass": "",
  }

  opcionesLeds = [
    { id: 0, nombre: 'LEDs Off', descripcion: 'Turn off all LEDs.' },
    { id: 1, nombre: 'Pulsating LEDs', descripcion: 'The LEDs blink gently in a pulsing pattern.' },
    { id: 2, nombre: 'Progresive', descripcion: 'The LEDs light up sequentially, creating a progressive effect.' },
    { id: 3, nombre: 'Rainbow', descripcion: 'The LEDs display a variety of colors in a rainbow-shaped pattern.' },
    { id: 4, nombre: 'Solid color', descripcion: 'The LEDs display a constant solid color.' }
  ];
  
  opcionSeleccionadaLed: any;
   
  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    ) {

      
  }
    ngOnInit(): void {
      this.opcionSeleccionadaLed = this.opcionesLeds[0];
      this.loadConfig();
    }
    
    loadConfig() {
      this.apiService.getCurrentConfigData(true)
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
      console.log(this.network);
      this.apiService.saveNetwork(this.network).subscribe(
        data => {
          alert("Changes saved. DeepDeck should restart now!")
          this.loadConfig();
        }
      )
    }

    saveLed(){
      console.log(this.opcionSeleccionadaLed);
      this.apiService.saveLed(this.opcionSeleccionadaLed).subscribe(
        data => {
          alert("Changes saved.!") 
        }
      )
    }

    onTabHeaderFocusChanged(event: FocusEvent): void {
      event.preventDefault();
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
