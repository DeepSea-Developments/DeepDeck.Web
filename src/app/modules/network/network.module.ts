import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkRoutingModule } from './network.routing';
import { NetworkComponent } from './pages/network.component'; 
import { SharedModule } from '../../shared/shared.module'; 

import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    NetworkRoutingModule,
    SharedModule,
    ColorPickerModule
  ],
  declarations: [
    NetworkComponent,
  ],
  providers: [
  ],
})
export class NetworkModule { }