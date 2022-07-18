import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WifiComponent } from './pages/wifi.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: WifiComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WifiRoutingModule { }