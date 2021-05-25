import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-firmware',
  templateUrl: './firmware.component.html',
  styleUrls: ['./firmware.component.scss']
})

export class FirmwareComponent implements OnInit {
  
  filePath : any;
  fileInput: any;


  constructor(    
    private authService: AuthService){

    }

    ngOnInit(): void {
        this.loadClients();
    }

    loadClients() {
      
    }

    refreshClients(value) {

    }
    
    openDialog() {

    }

    upload() {
      let filePath = this.filePath;
      let upload_path = "/upload/" + filePath;
      let fileInput = this.fileInput;

      /* Max size of an individual file. Make sure this
       * value is same as that set in file_server.c */
      var MAX_FILE_SIZE = 200 * 1024;

      if (fileInput.length == 0) {
          alert("No file selected!");
      } else if (filePath.length == 0) {
          alert("File path on server is not set!");
      } else if (filePath.indexOf(' ') >= 0) {
          alert("File path on server cannot have spaces!");
      } else if (filePath[filePath.length - 1] == '/') {
          alert("File name not specified after path!");
      } else if (fileInput[0].size > MAX_FILE_SIZE) {
          alert("File size must be less than 200KB!");
      } else {
          // document.getElementById("newfile").disabled = true;
          // document.getElementById("filepath").disabled = true;
          // document.getElementById("upload").disabled = true;

          var file = fileInput[0];
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (xhttp.readyState == 4) {
                  if (xhttp.status == 200) {
                      document.open();
                      document.write(xhttp.responseText);
                      document.close();
                  } else if (xhttp.status == 0) {
                      alert("Server closed the connection abruptly!");
                      location.reload()
                  } else {
                      alert(xhttp.status + " Error!\n" + xhttp.responseText);
                      location.reload()
                  }
              }
          };
          xhttp.open("POST", upload_path, true);
          xhttp.send(file);
      }
  }
}