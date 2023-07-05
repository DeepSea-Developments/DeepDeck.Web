import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { throwError } from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  path: string;
  responsiveWatcher: Subscription;
  topGap = 56;
  username: any = "admin";

  ipAddress: string = "192.168.4.1";
  isConnected: boolean;
  loading: boolean = false;
  
  
  constructor(
    private route: Router,
    public authService: AuthService,
    public apiService: ApiService,
    private sidebarService: SidebarService
  ) {
    this.route.events.subscribe((val) => {
      this.path = this.route.url.split('?')[0];
    });
    this.ipAddress =  localStorage.getItem('ipAddress');
  }


  ngOnInit(): void {
    /*this.authService.getCurrentUserData(false)
    .subscribe(
      value => this.username = value.username
    );*/
    
  }

  toggleSideNav() {
    this.sidebarService.toggle();
  }

  logout(): any {
    console.log("Salir...")
    localStorage.removeItem('current_user');
    localStorage.removeItem('current_config');
    this.apiService.cleanData();
    this.authService.logout();
    this.route.navigateByUrl('/');
    
  }

  get isLoggedIn(): any {
    return this.authService.isLoggedIn();
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
