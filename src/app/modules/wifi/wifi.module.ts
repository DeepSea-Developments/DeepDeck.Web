import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WifiRoutingModule } from './wifi.routing';
import { WifiComponent } from './pages/wifi.component'; 
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WifiRoutingModule,
    SharedModule
  ],
  declarations: [
    WifiComponent,
  ],
  providers: [
  ],
})
export class WifiModule { }