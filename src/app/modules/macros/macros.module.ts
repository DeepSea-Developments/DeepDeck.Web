import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MacrosRoutingModule } from './macros.routing';
import { MacrosComponent } from './pages/macros.component';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    MacrosComponent,
    
  ],
  imports: [
    CommonModule,
    MacrosRoutingModule,
    SharedModule,
    MatExpansionModule
  ],
})
export class MacrosModule { }