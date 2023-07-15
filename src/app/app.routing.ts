import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SimpleComponent } from '../app/layouts/simple/simple.component'

export const SITE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'network',
    pathMatch: 'full',
  },
  // {
  //    path: 'session', loadChildren: () =>
  //      import('./modules/auth/auth.module').then(m => m.AuthModule)
  // },  
  {
    path: '',
    component: SimpleComponent,
    // canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [     
      {
        path: 'keymap', loadChildren: () =>
          import('./modules/keymap/keymap.module').then(m => m.KeymapModule)
      },
      {
        path: 'macros', loadChildren: () =>
          import('./modules/macros/macros.module').then(m => m.MacrosModule)
      },
      {
        path: 'network', loadChildren: () =>
          import('./modules/network/network.module').then(m => m.NetworkModule)
      },      
      // {
      //   path: 'firmware', loadChildren: () =>
      //     import('./modules/firmware/firmware.module').then(m => m.FirmwareModule)
      // }
    ],   
  },{
    path: '**',
    redirectTo: 'keymap'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(SITE_ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
