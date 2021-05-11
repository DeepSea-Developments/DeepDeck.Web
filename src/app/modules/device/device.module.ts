import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceRoutingModule } from './device.routing';
import { DeviceComponent } from './pages/device.component'; 
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DeviceRoutingModule,
    SharedModule
  ],
  declarations: [
    DeviceComponent,
  ],
  providers: [
  ],
})
export class DeviceModule { }