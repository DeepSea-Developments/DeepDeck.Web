import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { MenuItems } from '../../core/menu/menu-items/menu-items';
import { mainContentAnimation } from 'src/app/animations';

@Component({
  selector: 'layout-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
  animations: [mainContentAnimation()]
})
export class SimpleComponent {
  stateBar = false; 
  constructor(
    public menuItems: MenuItems,
    private sidebarService: SidebarService,
  ) { }
  
  ngOnInit() {
    this.sidebarService.sidebarStateObservable$
      .subscribe((newState: string) => {        
        this.stateBar = newState === 'open' ? true : false;
      });
  }

  toggleSideNav() {
    this.sidebarService.toggle();
  }

}