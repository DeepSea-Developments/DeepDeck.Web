import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { KeyboardService } from 'src/app/core/services/keyboard/keyboard.service';

//técnica de "debounce"
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

//FORZAR VISTA ESCRITORIO MOVIL
import { ViewportScroller } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit {
  
  layer: any = {
    "uuid": uuidv4().slice(0,6), //use short ID generation
    "name":	"layer",
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
        "key_code":	402,
        "key_code_name": "LY_RISE"
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
  keyList_basic = this.keyboardService.getKeyListBasic();
  keylist_numpad = this.keyboardService.getKeyListNumpad();
  keylist_functions = this.keyboardService.getKeyListFunctions();
  keylist_media = this.keyboardService.getKeyListMedia();
  keylist_mouse = this.keyboardService.getKeyListMouse();
  keylist_macro_aux = []
  keylist_macros = [];
  tuple = [];

  deepKeys: any;
  
  getTextFontSize(text: string): string {
    return this.keyboardService.getTextFontSize(text);
  }

  KeyName: String;
  seletedDeepKey: any;
  seletedDeepFunctionKey: any;
  indexDeepKey: any;
  seletedBoard: any;
  uuid: any;
  pos: any;
  
  inputChanged: Subject<string> = new Subject<string>();
  mostrarKnobs: boolean = false;
  mostrarGestures: boolean = false;
  mostrarDeppDeck: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public apiService: ApiService,
    private router : Router,
    private keyboardService: KeyboardService, 
    private viewportScroller: ViewportScroller,
    @Inject(DOCUMENT) private document: Document
  ) { }

  GetKeyNameByKeyCode(keyNumber: number): string | undefined {
    return this.keyboardService.GetKeyNameByKeyCode(keyNumber); // Return undefined if no match is found
  }

  ngOnInit(): void { 
    
    const isMobile = this.isMobileDevice();
  
    if (isMobile) {
      console.log('forceDesktopView')
      //this.forceDesktopView();
      
    }

    this.activatedRoute.params.subscribe(params => {
      this.uuid = params.id;
      // console.log(this.uuid);
      // console.log(this.pos);
      if(this.uuid) {
        this.getLayersLayout(this.uuid);
      }     
    }); 
  
    this.apiService.getMacros()
      .subscribe(
        value => {
          this.keylist_macro_aux = value.macros;
          // console.log(value.macros);
          this.keylist_macros = this.keylist_macro_aux.map(obj => [obj.name, obj.name, obj.keycode]);
        }
      );


      this.inputChanged
      .pipe(
        debounceTime(250), // Espera 250 ms después de la última emisión
        distinctUntilChanged() // Evita emitir si el valor es igual al anterior
      )
      .subscribe((inputValue: string) => {
        // Invocar al servicio aquí con el valor del input completo
        this.updateKeyName();
      });

      this.indexDeepKey='';
  }

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.inputChanged.next(inputValue);
  }

  cambiarVisibilidad(div: string) {
    if (div === 'knobs') {
      this.mostrarKnobs = true;
      this.mostrarGestures = false;
      this.mostrarDeppDeck=false;
    } else if (div === 'gestures') {
      this.mostrarKnobs = false;
      this.mostrarGestures = true;
      this.mostrarDeppDeck=false;
    }else if (div === 'deppDeck') {
      this.mostrarKnobs = false;
      this.mostrarGestures = false;
      this.mostrarDeppDeck=true;
    }
  }

  private isMobileDevice(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('android') || userAgent.includes('iphone');
  }
  
  private forceDesktopView() {
    const viewportMetaTag = this.document.querySelector('meta[name="viewport"]');
    viewportMetaTag.setAttribute('content', 'width=1280, user-scalable=no');
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  getLayersLayout(uuid){
    this.apiService.getLayersLayout(uuid).subscribe(response => {      
      this.layer = response; 
      this.layer.uuid = this.uuid;
      // Search name of the keys by their keycode, and add key_code_name into the later.
      for (const item of this.layer.row0) {
        item.key_code_name = this.keyboardService.GetKeyNameByKeyCode(item.key_code)
      }
      for (const item of this.layer.row1) {
        item.key_code_name = this.keyboardService.GetKeyNameByKeyCode(item.key_code)
      }
      for (const item of this.layer.row2) {
        item.key_code_name = this.keyboardService.GetKeyNameByKeyCode(item.key_code)
      }
      for (const item of this.layer.row3) {
        item.key_code_name = this.keyboardService.GetKeyNameByKeyCode(item.key_code)
      }
    })
  }

  pressKey(name, key_code, key_code_name){    
    this.seletedBoard = name;   
    this.KeyName = name; 
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
    this.KeyName = item.name;
  }

  updateKeyName(){
    this.deepKeys[this.indexDeepKey].name = this.KeyName;
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

