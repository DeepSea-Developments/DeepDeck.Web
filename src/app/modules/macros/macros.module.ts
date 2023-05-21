import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MacrosRoutingModule } from './macros.routing';
import { MacrosComponent } from './pages/macros.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MacrosComponent,
    
  ],
  imports: [
    CommonModule,
    MacrosRoutingModule,
    SharedModule
  ],
})
export class MacrosModule { }