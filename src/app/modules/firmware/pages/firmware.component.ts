import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-firmware',
  templateUrl: './firmware.component.html',
  styleUrls: ['./firmware.component.scss']
})

export class FirmwareComponent implements OnInit {
  
  filePath : any;
  fileInput: any;


  constructor(    
    public apiService: ApiService){

    }

    ngOnInit(): void {
       
    }

    reset() {
        this.apiService.resetDevice({reset : true}).subscribe(
            data => {
              alert("El dispositivo se esta reiniciando!")
            }
          )
      }

    upload() {
      let filePath = this.filePath;
      let upload_path = "/upload/";
      let fileInput = this.fileInput;

      /* Max size of an individual file. Make sure this
       * value is same as that set in file_server.c */
      var MAX_FILE_SIZE = 200 * 1024;

      if (fileInput.length == 0) {
          alert("No file selected!");
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