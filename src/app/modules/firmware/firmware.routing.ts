import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirmwareComponent } from './pages/firmware.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: FirmwareComponent
    },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FirmwareRoutingModule { }