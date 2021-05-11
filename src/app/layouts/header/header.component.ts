import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  path: string;
  responsiveWatcher: Subscription;
  topGap = 56;
  username;
  
  constructor(
    private route: Router,
    public authService: AuthService,
    private sidebarService: SidebarService
  ) {
    this.route.events.subscribe((val) => {
      this.path = this.route.url.split('?')[0];
    });

    // this.responsiveWatcher = this.mediaObserver.media$.subscribe(
    //   (change: MediaChange) => {
    //     if (change.mqAlias === 'xs') {
    //       this.topGap = 64;
    //     }
    //     else {
    //       this.topGap = 80;
    //     }
    //   }
    // );
  }

  ngOnInit(): void {
    this.authService.getCurrentUserData(false)
    .subscribe(
      value => this.username = value.username
    );
  }

  toggleSideNav() {
    this.sidebarService.toggle();
  }

  logout(): any {
    console.log("Salir...")
    localStorage.removeItem('django_user');
    this.authService.logout();    
    this.route.navigateByUrl('/');
    
  }

  get isLoggedIn(): any {
    return this.authService.isLoggedIn();
  }

}
