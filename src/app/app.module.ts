import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MomentModule } from 'ngx-moment';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { CommonModule } from '@angular/common';
import { DialogOverviewInventoryDialog } from './modules/device/pages/device.component';
import { ModalComponent } from './modules/modal/modal.component';
import { SideNavModule } from '../app/layouts/sidenav/sidenav.module';
import { HeaderModule } from '../app/layouts/header/header.module';
import { SimpleModule } from '../app/layouts/simple/simple.module';

const config: SocketIoConfig = { url: 'http://retailrealtime-dev-wapp.azurewebsites.net/', options: {} };

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    FontAwesomeModule,
    SocketIoModule.forRoot(config),
    MomentModule,
    SideNavModule,
    HeaderModule,
    SimpleModule
  ],
  declarations: [
    AppComponent,
    DialogOverviewInventoryDialog,
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
