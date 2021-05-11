import { Injectable } from '@angular/core';

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
    label?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    label?: string;
    children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'configurations',
        name: 'Nube',
        type: 'link',
        icon: 'settings',
    },
    {
        state: 'network',
        name: 'Network',
        type: 'link',
        icon: 'wifi',
    },
    {
        state: 'devices',
        name: 'Dispositivo',
        type: 'link',
        icon: 'widgets',
    },
    {
        state: 'firmware',
        name: 'Firmware',
        type: 'link',
        icon: 'wysiwyg',      
    },

    
];


@Injectable()
export class MenuItems {
    get(type): Menu[] {
        switch(type){
            case 0:
                return MENUITEMS;                
            
        }        
    }
}
