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
  
  clientList: any = [];
  length: number;
  pageNumber = 1;  
  columndefs: string[] = ['id','nit','name','email','is_active','action'];
  constructor(    
    private authService: AuthService){

    }

    ngOnInit(): void {
        this.loadClients();
    }

    loadClients() {
      this.authService.getClients().subscribe((data) => {      
        this.clientList = data;
        console.log(data);
      })
    }

    refreshClients(value) {

    }
    
    openDialog() {

    }
}