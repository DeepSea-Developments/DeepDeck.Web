import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration.rounting';
import { ConfigurationComponent } from './pages/configuration.component'; 
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule
  ],
  declarations: [
    ConfigurationComponent,
  ],
  providers: [
  ],
})
export class ConfigurationModule { }
