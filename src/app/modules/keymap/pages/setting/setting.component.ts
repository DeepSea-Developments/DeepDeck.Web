import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from '../../../../../../src/app/core/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';


// Declaration of tuple for key information. Standar name (like KC_A), easy name (like A) and assigned number.
type KeyTuple = [string,string,number];

type KeyArray = KeyTuple[];

const keylist_basic_tuple:KeyArray = [
  // ['KC_NO','NO',0],
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
  ['KC_NONUS_HASH', 'NONUS_HASH', 50],
  ['KC_SCOLON', 'SCOLON', 51],
  ['KC_QUOTE', 'QUOTE', 52],
  ['KC_GRAVE', 'GRAVE', 53],
  ['KC_COMMA', 'COMMA', 54],
  ['KC_DOT', 'DOT', 55],
  ['KC_SLASH', 'SLASH', 56],
  ['KC_CAPSLOCK', 'CAPSLOCK', 57],
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
  ['KC_PSCREEN', 'PSCREEN', 70],
  ['KC_SCROLLLOCK', 'SCROLLLOCK', 71],
  ['KC_PAUSE', 'PAUSE', 72],
  ['KC_INSERT', 'INSERT', 73],
  ['KC_HOME', 'HOME', 74],
  ['KC_PGUP', 'PGUP', 75],
  ['KC_DELETE', 'DELETE', 76],
  ['KC_END', 'END', 77],
  ['KC_PGDOWN', 'PGDOWN', 78],
  ['KC_RIGHT', 'RIGHT', 79],
  ['KC_LEFT', 'LEFT', 80],
  ['KC_DOWN', 'DOWN', 81],
  ['KC_UP', 'UP', 82],
  ['KC_NUMLOCK', 'NUMLOCK', 83],
];

enum keyList_basic
{
  KC_NO = 0x00,
	KC_ROLL_OVER,
	KC_POST_FAIL,
	KC_UNDEFINED,
	KC_A,
	KC_B,
	KC_C,
	KC_D,
	KC_E,
	KC_F,
	KC_G,
	KC_H,
	KC_I,
	KC_J,
	KC_K,
	KC_L,
	KC_M, /* 0x10 */
	KC_N,
	KC_O,
	KC_P,
	KC_Q,
	KC_R,
	KC_S,
	KC_T,
	KC_U,
	KC_V,
	KC_W,
	KC_X,
	KC_Y,
	KC_Z,
	KC_1,
	KC_2,
	KC_3, /* 0x20 */
	KC_4,
	KC_5,
	KC_6,
	KC_7,
	KC_8,
	KC_9,
	KC_0,
	KC_ENTER,
	KC_ESCAPE,
	KC_BSPACE,
	KC_TAB,
	KC_SPACE,
	KC_MINUS,
	KC_EQUAL,
	KC_LBRACKET,
	KC_RBRACKET, /* 0x30 */
	KC_BSLASH, /* \ (and |) */
	KC_NONUS_HASH, /* Non-US # and ~ (Typically near the Enter key) */
	KC_SCOLON, /* ; (and :) */
	KC_QUOTE, /* ' and " */
	KC_GRAVE, /* Grave accent and tilde */
	KC_COMMA, /* , and < */
	KC_DOT, /* . and > */
	KC_SLASH, /* / and ? */
	KC_CAPSLOCK,
	KC_F1,
	KC_F2,
	KC_F3,
	KC_F4,
	KC_F5,
	KC_F6,
	KC_F7, /* 0x40 */
	KC_F8,
	KC_F9,
	KC_F10,
	KC_F11,
	KC_F12,
	KC_PSCREEN,
	KC_SCROLLLOCK,
	KC_PAUSE,
	KC_INSERT,
	KC_HOME,
	KC_PGUP,
	KC_DELETE,
	KC_END,
	KC_PGDOWN,
	KC_RIGHT,
	KC_LEFT, /* 0x50 */
	KC_DOWN,
	KC_UP,
	KC_NUMLOCK,
	KC_KP_SLASH,
	KC_KP_ASTERISK,
	KC_KP_MINUS,
	KC_KP_PLUS,
	KC_KP_ENTER,
	KC_KP_1,
	KC_KP_2,
	KC_KP_3,
	KC_KP_4,
	KC_KP_5,
	KC_KP_6,
	KC_KP_7,
	KC_KP_8, /* 0x60 */
	KC_KP_9,
	KC_KP_0,
	KC_KP_DOT,
	KC_NONUS_BSLASH, /* Non-US \ and | (Typically near the Left-Shift key) */
	KC_APPLICATION,
	KC_POWER,
	KC_KP_EQUAL,
	KC_F13,
	KC_F14,
	KC_F15,
	KC_F16,
	KC_F17,
	KC_F18,
	KC_F19,
	KC_F20,
	KC_F21, /* 0x70 */
	KC_F22,
	KC_F23,
	KC_F24,
	KC_EXECUTE,
	KC_HELP,
	KC_MENU,
	KC_SELECT,
	KC_STOP,
	KC_AGAIN,
	KC_UNDO,
	KC_CUT,
	KC_COPY,
	KC_PASTE,
	KC_FIND,
	KC__MUTE,
	KC__VOLUP, /* 0x80 */
	KC__VOLDOWN,
	KC_LOCKING_CAPS, /* locking Caps Lock */
	KC_LOCKING_NUM, /* locking Num Lock */
	KC_LOCKING_SCROLL, /* locking Scroll Lock */
	KC_KP_COMMA,
	KC_KP_EQUAL_AS400, /* equal sign on AS/400 */
	KC_INT1,
	KC_INT2,
	KC_INT3,
	KC_INT4,
	KC_INT5,
	KC_INT6,
	KC_INT7,
	KC_INT8,
	KC_INT9,
	KC_LANG1, /* 0x90 */
	KC_LANG2,
	KC_LANG3,
	KC_LANG4,
	KC_LANG5,
	KC_LANG6,
	KC_LANG7,
	KC_LANG8,
	KC_LANG9,
	KC_ALT_ERASE,
	KC_SYSREQ,
	KC_CANCEL,
	KC_CLEAR,
	KC_PRIOR,
	KC_RETURN,
	KC_SEPARATOR,
	KC_OUT, /* 0xA0 */
	KC_OPER,
	KC_CLEAR_AGAIN,
	KC_CRSEL,
	KC_EXSEL, /* 0xA4 */
};


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit {
  
  layer: any = {
    "uuid": uuidv4(),    
    "name":	"Name",
    "active":	true,
    "row0":	[{
        "name":	"7",
        "key_code":	36
      }, {
        "name":	"8",
        "key_code":	37
      }, {
        "name":	"9",
        "key_code":	38
      }, {
        "name":	"layer",
        "key_code":	258
      }],
    "row1":	[{
        "name":	"4",
        "key_code":	33
      }, {
        "name":	"5",
        "key_code":	34
      }, {
        "name":	"6",
        "key_code":	35
      }, {
        "name":	"/",
        "key_code":	84
      }],
    "row2":	[{
        "name":	"1",
        "key_code":	30
      }, {
        "name":	"2",
        "key_code":	31
      }, {
        "name":	"3",
        "key_code":	32
      }, {
        "name":	"*",
        "key_code":	85
      }],
    "row3":	[{
        "name":	".",
        "key_code":	55
      }, {
        "name":	"0",
        "key_code":	39
      }, {
        "name":	"-",
        "key_code":	86
      }, {
        "name":	"+",
        "key_code":	87
      }],
    "left_encoder_map":	{
      "cw":	80,
      "ccw":	79,
      "single_press":	292,
      "long_press":	293,
      "double_press":	293
    },
    "right_encoder_map":	{
      "cw":	81,
      "ccw":	82,
      "single_press":	40,
      "long_press":	43,
      "double_press":	43
    },
    "gesture_map":	{
      "up":	39,
      "down":	30,
      "left":	31,
      "right":	32,
      "near":	33,
      "far":	34
    }
  }

  objectKeys = Object.keys;
  // keyList = { backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pausebreak:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,leftwindowkey:91,rightwindowkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};
  //keyList_basic = keyList_basic;
  keyList_basic = keylist_basic_tuple;

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

  ngOnInit(): void {  
    this.activatedRoute.params.subscribe(params => {
      this.uuid = params.id;
      this.pos = params.pos
      console.log(this.uuid);
      console.log(this.pos);
      if(this.uuid) {
        this.getLayersLayout(this.uuid, this.pos);
      }     
    }); 
  }
  

  getLayersLayout(uuid, pos){
    this.apiService.getLayersLayout(uuid, pos).subscribe(response => {      
      this.layer = response; 
      this.layer.uuid = this.uuid;
      this.layer.pos = parseInt(this.pos);
    })
  }

  pressKey(name, key_code){    
    this.seletedBoard = name;    
    if(this.seletedDeepKey) {       
      Object.assign(this.deepKeys[this.indexDeepKey], {name, key_code});      
    }
  }

  pressDeepKey(deepKeys, item, index){    
    this.seletedDeepKey = item;
    this.indexDeepKey = index;
    this.deepKeys = deepKeys;
  }

  saveLayer(){    
    console.log(this.layer);    
    if(this.uuid){
      let { name: new_name, ...rest } = this.layer;
      this.layer = { new_name, ...rest};
      console.log(this.layer);    
      this.apiService.updateLayersLayout(this.layer).subscribe(response => {
        console.log(response);
        this.router.navigate(['/keymap']); 
      });
    } else {
      this.apiService.createLayer(this.layer).subscribe(response => {
        console.log(response);
        this.router.navigate(['/keymap']); 
      })
    }
  }
}
