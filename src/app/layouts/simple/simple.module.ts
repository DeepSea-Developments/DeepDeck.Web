import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleComponent } from '../simple/simple.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { HeaderModule } from '../header/header.module';
import { SideNavModule } from '../sidenav/sidenav.module';
@NgModule({
  declarations: [SimpleComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    HeaderModule,
    SideNavModule
  ],
  exports: [
    SimpleComponent,
  ]
})
export class SimpleModule { }