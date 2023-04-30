import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../../../../src/app/core/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

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
  keyList = { backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pausebreak:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,leftwindowkey:91,rightwindowkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};
  
  deepKeys: any;
  

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
