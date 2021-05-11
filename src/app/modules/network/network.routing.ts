import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NetworkComponent } from './pages/network.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: NetworkComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NetworkRoutingModule { }