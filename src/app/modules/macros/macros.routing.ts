import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MacrosComponent } from './pages/macros.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MacrosComponent
    },
    // {
    //     path: 'setting',
    //     component: SettingComponent
    // },
    // {
    //     path: 'setting/:id',        
    //     component: SettingComponent
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MacrosRoutingModule { }