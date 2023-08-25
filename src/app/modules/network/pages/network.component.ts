import { Component, OnInit, Inject,ViewEncapsulation  } from '@angular/core';
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
  styleUrls: ['./network.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NetworkComponent implements OnInit {

  currentURL: string = '';
  network: any = {
    "ssid": "",
    "pass": "",
  }
  
  opcionesLeds = [
    { id: 0, nombre: 'LEDs Off', descripcion: 'Turn off all LEDs.' },
    { id: 1, nombre: 'Pulsating LEDs', descripcion: 'The LEDs blink gently in a pulsing pattern.' },
    { id: 2, nombre: 'Progresive', descripcion: 'The LEDs light up sequentially, creating a progressive effect.' },
    { id: 3, nombre: 'Rainbow', descripcion: 'The LEDs display a variety of colors in a rainbow-shaped pattern.' },
    { id: 4, nombre: 'Solid color', descripcion: 'The LEDs display a constant solid color.' },
    { id: 5, nombre: 'Solid color active', descripcion: 'The LEDs show a constant solid color to whichever keys are configured.' },
  ];
  
  opcionSeleccionadaLed: any;
  
  passwordVisible: boolean = false;
  
  ipAddress: string = "192.168.4.1";
  isConnected: boolean;
  loading: boolean = false;
  
  valorH: number = 50; // Valor inicial del slider  
  valorS: number = 50; // Valor inicial del slider  
  valorV: number = 50; // Valor inicial del slider  
  valorSpeed: number = 50; // Valor inicial del slider  
  
  selectedColor: string = '#FF0000';

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    ) { 

  }
    ngOnInit(): void {
      this.opcionSeleccionadaLed = this.opcionesLeds[0];
      this.loadConfig();
      this.getLocalIPAddress();
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

      let hexToRgb = null;
      let valorH= null;
      let valorS= null;
      let valorV= null;
      let valorSpeed= null;

      if(this.opcionSeleccionadaLed.id === 4 || this.opcionSeleccionadaLed.id === 5 ){
        hexToRgb = this.hexToRgb(this.selectedColor)
      }else  if(this.opcionSeleccionadaLed.id === 3 || this.opcionSeleccionadaLed.id === 2 || this.opcionSeleccionadaLed.id === 1 ){
        valorH = this.valorH;
        valorS = this.valorS;
        valorV = this.valorV;
        valorSpeed = this.valorSpeed;
      }
      

      let itemLed = {
          mode: this.opcionSeleccionadaLed.id,
          H: valorH, 
          S: valorS, 
          V: valorV, 
          speed: valorSpeed, 
          rgb: hexToRgb
      } 

      this.apiService.saveLed(itemLed).subscribe(
        data => {
          // alert("Changes saved.!") 
        }
      )
    }

    formatoSlider(value: number | null): string {
      if (!value) {
        return '0';
      }
    
      return `${value}`;
    }
  
    hexToRgb(hex: string): number[] {
      // Eliminar el símbolo "#" si está presente en el color hexadecimal
      hex = hex.replace("#", "");
    
      // Verificar si el string es un color hexadecimal válido
      const hexRegex = /^[0-9A-Fa-f]{6}$/;
      if (!hexRegex.test(hex)) {
        // Si no es un color hexadecimal válido, devolver un color fijo
        return [255, 0, 0]; // Por ejemplo, rojo
      }
    
      // Extraer los valores de los componentes de color (r, g, b)
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
    
      // Devolver los valores de los componentes de color en un array
      return [r, g, b];
    }


    onTabHeaderFocusChanged(event: FocusEvent): void {
      event.preventDefault();
    }

    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }

    getLocalIPAddress() {       
      let url = window.location.href;
      let regex = /(?:http|https):\/\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/;
      let match = url.match(regex);

      if (match && match.length > 1) {
        this.currentURL = match[1];
        console.log('getLocalIPAddress match',url)
      }else{
        let url = new URL(window.location.href);
        this.currentURL = url.hostname;
        console.log('getLocalIPAddress  url',url)
      }

      this.ipAddress =  this.currentURL;
      // Store the IP address in the localStorage
      localStorage.setItem('ipAddress', this.ipAddress);

    }

    testConnection() {

      // Store the IP address in the localStorage
      localStorage.setItem('ipAddress', this.ipAddress);
  
      this.apiService.updateIP(this.ipAddress);
  
      this.loading = true; // Set loading state to true
  
      this.apiService.getCurrentConfigData(true).subscribe(
        () => {
          // Connection successful
          this.isConnected = true;
          this.loading = false; // Set loading state to false
        },
        (error) => {
          // Connection failed
          this.isConnected = false;
          console.error(error); // Log the error for debugging purposes
          this.loading = false; // Set loading state to false
        }
      );
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
