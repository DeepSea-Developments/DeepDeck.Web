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
    { id: 9, nombre: 'Layer color', descripcion: 'Every mapped key shows the colour of the layer that is active, so you can tell layers apart at a glance.' },
    { id: 8, nombre: 'Key colors', descripcion: 'Each key shows its own colour. Set them per layer in the layer editor.' }
  ];

  opcionSeleccionadaLed: any;

  /* Brightness applies to every mode. The default here only matters until
     loadLed() has heard back from the device. */
  ledBrightness: number = 50;

  /* Colour used by the Solid color mode. */
  ledColor: string = '#002878';

  private brightnessTimer: any = null;

  passwordVisible: boolean = false;

  ipAddress: string = "192.168.4.1";
  isConnected: boolean;
  loading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public apiService: ApiService,
    ) { 

  }
    ngOnInit(): void {
      /* Deliberately not pre-selecting a mode here. It used to default to
         opcionesLeds[0], which is "LEDs Off", and loadLed() only corrects that
         once the device answers - so saving before then, or after a failed
         load, posted mode 0 and turned the LEDs off. */
      this.loadConfig();
      this.loadLed();
      this.getLocalIPAddress();
    }

    /* Read the settings off the device first. Without this the controls would
       start at the defaults above, and the first save would quietly undo a
       brightness or colour set from the on-device menu. */
    loadLed() {
      this.apiService.getLed().subscribe(
        value => {
          const match = this.opcionesLeds.find(opcion => opcion.id === value.mode);
          if (match) {
            this.opcionSeleccionadaLed = match;
          }
          if (typeof value.brightness === 'number') {
            this.ledBrightness = value.brightness;
          }
          if (value.color) {
            this.ledColor = value.color;
          }
        }
      );
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

    /* Each control sends only its own field. The firmware merges a partial
       payload into the settings it already holds, so brightness cannot disturb
       the mode and the mode cannot disturb the brightness. Sending all three
       together is what let a stale card selection switch the LEDs off. */
    saveLed(){
      if (!this.opcionSeleccionadaLed) {
        alert("No LED mode loaded from the device yet.");
        return;
      }
      this.apiService.saveLed({ id: this.opcionSeleccionadaLed.id }).subscribe(
        data => {
          alert("Changes saved.!") 
        }
      )
    }

    /* Brightness applies as you drag, so the slider shows what it does. The
       timer coalesces a drag into one request instead of one per pixel. */
    onBrightnessChange() {
      if (this.brightnessTimer) {
        clearTimeout(this.brightnessTimer);
      }
      this.brightnessTimer = setTimeout(() => {
        this.brightnessTimer = null;
        this.apiService.saveLed({ brightness: this.ledBrightness }).subscribe();
      }, 200);
    }

    onLedColorChange() {
      this.apiService.saveLed({ color: this.ledColor }).subscribe();
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
        // Served from the DeepDeck itself, so the page's own host is the device.
        this.currentURL = match[1];
        console.log('getLocalIPAddress match',url)
        this.ipAddress = this.currentURL;
        localStorage.setItem('ipAddress', this.ipAddress);
        return;
      }

      /* Served from somewhere that is not the device - ng serve on localhost,
         or the GitHub Pages copy. The page's own hostname is not the DeepDeck,
         so keep whatever was last entered in the field below rather than
         overwriting it with "localhost" on every visit to this page. */
      const stored = localStorage.getItem('ipAddress');
      if (stored) {
        this.ipAddress = stored;
      }
      console.log('getLocalIPAddress: not served from a device, using', this.ipAddress);
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
