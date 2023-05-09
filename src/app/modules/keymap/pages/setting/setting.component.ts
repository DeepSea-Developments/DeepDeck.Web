import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


// Declaration of tuple for key information. Standar name (like KC_A), easy name (like A) and assigned number.
type KeyTuple = [string,string,number];

type KeyArray = KeyTuple[];


const keylist_basic_tuple:KeyArray = [
  ['LY_RISE','Next Layer',258],
  ['LY_LOWER','Prev Layer',257],
  ['KC_NO','NO',0],
  // ['KC_ROLL_OVER','KC_ROLL_OVER',1],
  // ['KC_POST_FAIL','KC_POST_FAIL',2],
  // ['KC_UNDEFINED','KC_UNDEFINED',3],
  ['KC_A', 'A', 4],
  ['KC_B', 'B', 5],
  ['KC_C', 'C', 6],
  ['KC_D', 'D', 7],
  ['KC_E', 'E', 8],
  ['KC_F', 'F', 9],
  ['KC_G', 'G', 10],
  ['KC_H', 'H', 11],
  ['KC_I', 'I', 12],
  ['KC_J', 'J', 13],
  ['KC_K', 'K', 14],
  ['KC_L', 'L', 15],
  ['KC_M', 'M', 16],
  ['KC_N', 'N', 17],
  ['KC_O', 'O', 18],
  ['KC_P', 'P', 19],
  ['KC_Q', 'Q', 20],
  ['KC_R', 'R', 21],
  ['KC_S', 'S', 22],
  ['KC_T', 'T', 23],
  ['KC_U', 'U', 24],
  ['KC_V', 'V', 25],
  ['KC_W', 'W', 26],
  ['KC_X', 'X', 27],
  ['KC_Y', 'Y', 28],
  ['KC_Z', 'Z', 29],
  ['KC_1', '1', 30],
  ['KC_2', '2', 31],
  ['KC_3', '3', 32],
  ['KC_4', '4', 33],
  ['KC_5', '5', 34],
  ['KC_6', '6', 35],
  ['KC_7', '7', 36],
  ['KC_8', '8', 37],
  ['KC_9', '9', 38],
  ['KC_0', '0', 39],

  ['KC_RIGHT', 'RIGHT', 79],
  ['KC_LEFT', 'LEFT', 80],
  ['KC_DOWN', 'DOWN', 81],
  ['KC_UP', 'UP', 82],

  ['KC_LCTRL', 'LCTRL', 224],
  ['KC_LSHIFT', 'LSHIFT', 225],
  ['KC_LALT', 'LALT', 226],
  ['KC_LGUI', 'LGUI', 227],
  ['KC_RCTRL', 'RCTRL', 228],
  ['KC_RSHIFT', 'RSHIFT', 229],
  ['KC_RALT', 'RALT', 230],
  ['KC_RGUI', 'RGUI', 231],

  ['KC_ENTER', 'ENTER', 40],
  ['KC_ESCAPE', 'ESCAPE', 41],
  ['KC_BSPACE', 'BSPACE', 42],
  ['KC_TAB', 'TAB', 43],
  ['KC_SPACE', 'SPACE', 44],
  ['KC_MINUS', 'MINUS', 45],
  ['KC_EQUAL', 'EQUAL', 46],
  ['KC_LBRACKET', 'LBRACKET', 47],
  ['KC_RBRACKET', 'RBRACKET', 48],
  ['KC_BSLASH', 'BSLASH', 49],
  // ['KC_NONUS_HASH', 'NONUS_HASH', 50],
  ['KC_SCOLON', 'SCOLON', 51],
  ['KC_QUOTE', 'QUOTE', 52],
  ['KC_GRAVE', 'GRAVE', 53],
  ['KC_COMMA', 'COMMA', 54],
  ['KC_DOT', 'DOT', 55],
  ['KC_SLASH', 'SLASH', 56],
  ['KC_CAPSLOCK', 'CAPSLOCK', 57],
];

const keylist_functions_tuple:KeyArray = [
  
  ['KC_PSCREEN', 'PSCREEN', 70],
  ['KC_SCROLLLOCK', 'SCROLLLOCK', 71],
  ['KC_PAUSE', 'PAUSE', 72],
  ['KC_INSERT', 'INSERT', 73],
  ['KC_HOME', 'HOME', 74],
  ['KC_PGUP', 'PGUP', 75],
  ['KC_DELETE', 'DELETE', 76],
  ['KC_END', 'END', 77],
  ['KC_PGDOWN', 'PGDOWN', 78],
  
  ['KC_NUMLOCK', 'NUMLOCK', 83],
  ['KC_F1', 'F1', 58],
  ['KC_F2', 'F2', 59],
  ['KC_F3', 'F3', 60],
  ['KC_F4', 'F4', 61],
  ['KC_F5', 'F5', 62],
  ['KC_F6', 'F6', 63],
  ['KC_F7', 'F7', 64],
  ['KC_F8', 'F8', 65],
  ['KC_F9', 'F9', 66],
  ['KC_F10', 'F10', 67],
  ['KC_F11', 'F11', 68],
  ['KC_F12', 'F12', 69],
  
];

const keylist_media_tuple:KeyArray = [
  ['KC_MEDIA_NEXT_TRACK', 'NEXT_TRACK', 168],
  ['KC_MEDIA_PREV_TRACK', 'PREV_TRACK', 169],
  ['KC_MEDIA_STOP', 'STOP', 170],
  ['KC_MEDIA_PLAY_PAUSE', 'PLAY', 171],
  ['KC_AUDIO_MUTE', 'MUTE', 172],
  ['KC_AUDIO_VOL_UP', 'VOL_UP', 173],
  ['KC_AUDIO_VOL_DOWN', 'VOL_DOWN', 174],
];

const keylist_mouse_tuple:KeyArray = [
  ['KC_MS_UP', 'MsUP', 241],
  ['KC_MS_DOWN', 'MsDOWN', 240], // Inverted to work better
  ['KC_MS_LEFT', 'MsLEFT', 243],
  ['KC_MS_RIGHT', 'MsRIGHT', 242], // Inverted to work better
  ['KC_MS_BTN1', 'MsBTN1', 244],
  ['KC_MS_BTN2', 'MsBTN2', 245],
  ['KC_MS_BTN3', 'MsBTN3', 246],
  ['KC_MS_BTN4', 'MsBTN4', 247],
  ['KC_MS_BTN5', 'MsBTN5', 248],
  ['KC_MS_WH_UP', 'MsWH_UP', 249],
  ['KC_MS_WH_DOWN', 'MsWhDOWN', 250],
  ['KC_MS_WH_LEFT', 'MsWhLEFT', 251],
  ['KC_MS_WH_RIGHT', 'MsWhRIGHT', 252],
  ['KC_MS_ACCEL0', 'MsACCEL0', 253],
  ['KC_MS_ACCEL1', 'MsACCEL1', 254],
  ['KC_MS_ACCEL2', 'MsACCEL2', 255],
];

const keylist_macro_tuple: KeyArray = [
  ['M1', 'Macro1', 259],
  ['M2', 'Macro2', 260],
  ['M3', 'Macro3', 261],
];

const lastElementNumber = 40;

for (let i = 4; i <= lastElementNumber; i++) {
  const tuple: [string, string, number] = [`M${i}`, `Macro${i}`, i + 255];
  keylist_macro_tuple.push(tuple);
}

const all_keylist: KeyArray = [...keylist_basic_tuple, 
                              ...keylist_functions_tuple, 
                              ...keylist_media_tuple, 
                              ...keylist_mouse_tuple, 
                              ...keylist_macro_tuple];

function GetKeyNameByKeyCode(keyNumber: number): string | undefined {
  for (const tuple of all_keylist) {
    if (tuple[2] === keyNumber) {
      return tuple[0];
    }
  }
  return undefined; // Return undefined if no match is found
}


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})



export class SettingComponent implements OnInit {
  
  layer: any = {
    "uuid": uuidv4().slice(0,6), //use short ID generation
    "name":	"Name",
    "active":	true,
    "row0":	[{
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"layer",
        "key_code":	258
      }],
    "row1":	[{
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }],
    "row2":	[{
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }],
    "row3":	[{
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }, {
        "name":	"No",
        "key_code":	0,
        "key_code_name": "KC_NO"
      }],
    "left_encoder_map":	{
      "cw":	0,
      "ccw":	0,
      "single_press":	0,
      "long_press":	0,
      "double_press":	0
    },
    "right_encoder_map":	{
      "cw":	0,
      "ccw":	0,
      "single_press":	0,
      "long_press":	0,
      "double_press":	0
    },
    "gesture_map":	{
      "up":	0,
      "down":	0,
      "left":	0,
      "right":	0,
      "near":	0,
      "far":	0
    }
  }

  objectKeys = Object.keys;
  // keyList = { backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pausebreak:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,leftwindowkey:91,rightwindowkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};
  //keyList_basic = keyList_basic;
  keyList_basic = keylist_basic_tuple;
  keylist_functions = keylist_functions_tuple;
  keylist_media = keylist_media_tuple;
  keylist_mouse = keylist_mouse_tuple;
  keylist_macros = keylist_macro_tuple;

  deepKeys: any;
  
  getTextFontSize(text: string): string {
    const baseFontSize = 14; // Base font size in pixels
    const maxLength = 10; // Maximum text length before reducing font size
  
    if (text.length > maxLength) {
      // Calculate the reduced font size based on text length
      const reducedFontSize = baseFontSize - (text.length - maxLength);
      return `${Math.max(reducedFontSize, 6)}px`; // Set minimum font size to 8
    } else {
      return `${baseFontSize}px`;
    }
  }

  seletedDeepKey: any;
  seletedDeepFunctionKey: any;
  indexDeepKey: any;
  seletedBoard: any;
  uuid: any;
  pos: any;
  deepMacros = ["M1", "M2", "M3", "M4", "M5"]


  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public apiService: ApiService,
    private router : Router
  ) { }

  GetKeyNameByKeyCode(keyNumber: number): string | undefined {
    return GetKeyNameByKeyCode(keyNumber); // Return undefined if no match is found
  }

  ngOnInit(): void {  
    this.activatedRoute.params.subscribe(params => {
      this.uuid = params.id;
      console.log(this.uuid);
      console.log(this.pos);
      if(this.uuid) {
        this.getLayersLayout(this.uuid);
      }     
    }); 
  }

  getLayersLayout(uuid){
    this.apiService.getLayersLayout(uuid).subscribe(response => {      
      this.layer = response; 
      this.layer.uuid = this.uuid;
      // Search name of the keys by their keycode, and add key_code_name into the later.
      for (const item of this.layer.row0) {
        item.key_code_name = GetKeyNameByKeyCode(item.key_code)
      }
      for (const item of this.layer.row1) {
        item.key_code_name = GetKeyNameByKeyCode(item.key_code)
      }
      for (const item of this.layer.row2) {
        item.key_code_name = GetKeyNameByKeyCode(item.key_code)
      }
      for (const item of this.layer.row3) {
        item.key_code_name = GetKeyNameByKeyCode(item.key_code)
      }
    })
  }

  pressKey(name, key_code, key_code_name){    
    this.seletedBoard = name;    
    if(this.seletedDeepKey) {    
      console.log(this.seletedDeepKey); 
      Object.assign(this.deepKeys[this.indexDeepKey], {name, key_code, key_code_name});      
    }
    if(this.seletedDeepFunctionKey) {   
      console.log(this.seletedDeepFunctionKey);
      console.log(name,key_code,key_code_name); 
      
      
      // this.layer.left_encoder_map.cw = key_code;   
      const propertyAccessString = `this.${this.seletedDeepFunctionKey}`;
      eval(`${propertyAccessString} = ${key_code}`);
      console.log(this.layer.left_encoder_map.cw)   
    }
  }

  pressDeepKey(deepKeys, item, index){  
    this. seletedDeepFunctionKey = null;  
    this.seletedDeepKey = item;
    this.indexDeepKey = index;
    this.deepKeys = deepKeys;
  }

  pressDeepFunctionKey(item){   
    this.seletedDeepKey = null; 

    console.log(item);
    this.seletedDeepFunctionKey = item; 
  }

  onTabHeaderFocusChanged(event: FocusEvent): void {
    event.preventDefault();
  }

  saveLayer(){ 
    
    const modifiedJson = JSON.parse(JSON.stringify(this.layer));
    for (const item of modifiedJson.row0) {
      delete item.key_code_name;
    }
    for (const item of modifiedJson.row1) {
      delete item.key_code_name;
    }
    for (const item of modifiedJson.row2) {
      delete item.key_code_name;
    }
    for (const item of modifiedJson.row3) {
      delete item.key_code_name;
    }

    console.log(modifiedJson);    
    if(this.uuid){ 
      this.apiService.updateLayersLayout(modifiedJson).subscribe(response => {
        console.log(response);
        this.router.navigate(['/keymap']); 
      });
    } else {
      this.apiService.createLayer(modifiedJson).subscribe(response => {
        console.log(response);
        this.router.navigate(['/keymap']); 
      })
    }
  }
}
