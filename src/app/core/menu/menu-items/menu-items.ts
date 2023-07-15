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
        state: 'keymap',
        name: 'KEYMAP',
        type: 'link',
        icon: 'keyboard',
    },    
    {
        state: 'macros',
        name: 'MACROS',
        type: 'link',
        icon: 'add_to_photos',
    },      
    {
        state: 'network',
        name: 'SETTINGS',
        type: 'link',
        icon: 'settings',
    },      
    // {
    //     state: 'firmware',
    //     name: 'FIRMWARE',
    //     type: 'link',
    //     icon: 'wysiwyg',      
    // },

    
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
