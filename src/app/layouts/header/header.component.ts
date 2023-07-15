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
  

}
