import { Injectable } from '@angular/core';

// Declaration of tuple for key information. Standard name (like KC_A), easy name (like A), and assigned number.
type KeyTuple = [string, string, number];
type KeyArray = KeyTuple[];

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private keyListBasic: KeyArray = [
    ['LY_RISE','Next Layer',401],
    ['LY_LOWER','Prev Layer',402],
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

  private keyListFunctions: KeyArray = [
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
    ['KC_F13', 'F13', 104],
    ['KC_F14', 'F14', 105],
    ['KC_F15', 'F15', 106],
    ['KC_F16', 'F16', 107],
    ['KC_F17', 'F17', 108],
    ['KC_F18', 'F18', 109],
    ['KC_F19', 'F19', 110],
    ['KC_F20', 'F20', 111],
    ['KC_F21', 'F21', 112],
    ['KC_F22', 'F22', 113],
    ['KC_F23', 'F23', 114],
    ['KC_F24', 'F24', 115],
  ];

  private keyListMedia: KeyArray = [
    ['KC_MEDIA_NEXT_TRACK', 'NEXT_TRACK', 168],
    ['KC_MEDIA_PREV_TRACK', 'PREV_TRACK', 169],
    ['KC_MEDIA_STOP', 'STOP', 170],
    ['KC_MEDIA_PLAY_PAUSE', 'PLAY', 171],
    ['KC_AUDIO_MUTE', 'MUTE', 172],
    ['KC_AUDIO_VOL_UP', 'VOL_UP', 173],
    ['KC_AUDIO_VOL_DOWN', 'VOL_DOWN', 174],
  ];

  private keyListMouse: KeyArray = [
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

  private keyListMacro: KeyArray = [];

  private keyListAll: KeyArray = [];

  private keyListMacroSelection = [];

  constructor() {
    this.populateKeyListMacro();
  }

  private populateKeyListMacro() {

    for (let i = 0; i < 40; i++) {
      const tuple: KeyTuple = [`M${i}`, `Macro${i}`, i + 500];
      this.keyListMacro.push(tuple);
    }

    this.keyListAll =  [
      ...this.keyListBasic, 
      ...this.keyListFunctions, 
      ...this.keyListMedia, 
      ...this.keyListMouse, 
      ...this.keyListMacro
    ];

    this.keyListMacroSelection = [
      ...this.keyListBasic.slice(3),
      ...this.keyListFunctions
    ];
  }

  GetKeyNameByKeyCode(keyNumber: number): string | undefined {
    for (const tuple of this.keyListAll) {
      if (tuple[2] === keyNumber) {
        return tuple[0];
      }
    }
    return undefined; // Return undefined if no match is found
  }

  GetKeyShortNameByKeyCode(keyNumber: number): string | undefined {
    for (const tuple of this.keyListAll) {
      if (tuple[2] === keyNumber) {
        return tuple[1];
      }
    }
    return undefined; // Return undefined if no match is found
  }

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

  getKeyListBasic(): KeyArray {
    return this.keyListBasic;
  }

  getKeyListFunctions(): KeyArray {
    return this.keyListFunctions;
  }

  getKeyListMedia(): KeyArray {
    return this.keyListMedia;
  }

  getKeyListMouse(): KeyArray {
    return this.keyListMouse;
  }

  getKeyListMacro(): KeyArray {
    return this.keyListMacro;
  }

  getKeyListAll(): KeyArray {
    return this.keyListAll;
  }

  getKeyListMacroSelection(): KeyArray {
    return this.keyListMacroSelection;
  }

}
