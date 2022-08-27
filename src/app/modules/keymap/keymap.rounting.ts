import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KeymapComponent } from './pages/keymap.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: KeymapComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class KeymapRoutingModule { }