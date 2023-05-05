import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SimpleComponent } from '../app/layouts/simple/simple.component'

export const SITE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'session',
    pathMatch: 'full',
  },
  {
     path: 'session', loadChildren: () =>
       import('./modules/auth/auth.module').then(m => m.AuthModule)
  },  
  {
    path: '',
    component: SimpleComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [     
      {
        path: 'keymap', loadChildren: () =>
          import('./modules/keymap/keymap.module').then(m => m.KeymapModule)
      },
      {
        path: 'network', loadChildren: () =>
          import('./modules/network/network.module').then(m => m.NetworkModule)
      },      
      {
        path: 'firmware', loadChildren: () =>
          import('./modules/firmware/firmware.module').then(m => m.FirmwareModule)
      }
    ],   
  },{
    path: '**',
    redirectTo: 'session'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(SITE_ROUTES, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
