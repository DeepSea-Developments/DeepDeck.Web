import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeymapComponent } from './pages/keymap.component';
import { SettingComponent } from './pages/setting/setting.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: KeymapComponent
    },
    {
        path: 'setting',
        component: SettingComponent
    },
    {
        path: 'setting/:id',        
        component: SettingComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KeymapRoutingModule { }