import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modules/modal/modal.component';
import { SideNavModule } from '../app/layouts/sidenav/sidenav.module';
import { HeaderModule } from '../app/layouts/header/header.module';
import { SimpleModule } from '../app/layouts/simple/simple.module';


import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    MomentModule,
    SideNavModule,
    HeaderModule,
    SimpleModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  declarations: [
    AppComponent,    
    ModalComponent
  ],
  providers: [
    MenuItems
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
