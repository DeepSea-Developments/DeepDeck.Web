import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleSidebarComponent } from './toggle-sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ToggleSidebarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    ToggleSidebarComponent,
  ]
})
export class ToggleSidebarModule { }