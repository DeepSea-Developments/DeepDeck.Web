import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { sidebarAnimation, iconAnimation, labelAnimation } from 'src/app/animations';
import { MenuItems } from '../../core/menu/menu-items/menu-items';
import { mainContentAnimation } from '../../animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    sidebarAnimation(),
    iconAnimation(),
    labelAnimation(),
    mainContentAnimation(),
  ]
})
export class SidenavComponent {
  sidebarState: string;
  isLoggedIn$: boolean; 
  constructor(
    public menuItems: MenuItems,
    private sidebarService: SidebarService,
  ) { }
  
  ngOnInit() {
    this.sidebarService.sidebarStateObservable$
      .subscribe((newState: string) => {
        this.sidebarState = newState;
      });
  }

  toggleSideNav() {
    this.sidebarService.toggle();
  }

}
