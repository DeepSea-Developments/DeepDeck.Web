import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmwareRoutingModule } from './firmware.routing';
import { FirmwareComponent } from './pages/firmware.component'; 
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FirmwareRoutingModule,
    SharedModule
  ],
  declarations: [
    FirmwareComponent,    
  ],
  providers: [
  ],
})
export class FirmwareModule { }