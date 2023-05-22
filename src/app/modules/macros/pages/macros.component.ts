import { Component } from '@angular/core';
import { KeyboardService } from 'src/app/core/services/keyboard/keyboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent {

  constructor(
    private keyboardService: KeyboardService, 
    public dialog: MatDialog,
    public apiService: ApiService,
    private router : Router,
  ) { }

  macroKeys: number[] = [0];
  macroKeysAux: any[];

  objectKeys = Object.keys;

  keyList_basic = this.keyboardService.getKeyListBasic();
  keylist_functions = this.keyboardService.getKeyListFunctions();
  keylist_media = this.keyboardService.getKeyListMedia();
  keylist_mouse = this.keyboardService.getKeyListMouse();
  keylist_macros = this.keyboardService.getKeyListMacro();
  deepdeckMacros = [];

  selectedMacroIndex: number;
  macroShortName = ""
  macroName = ""
  showMacroSection: boolean = false;

  ngOnInit(): void {  
    
    this.apiService.getMacros()
      .subscribe(
        value => {
          this.deepdeckMacros = value.macros;
          console.log(this.deepdeckMacros);
        }
      );

  }

  onTabHeaderFocusChanged(event: FocusEvent): void {
    event.preventDefault();
  }

  getTextFontSize(text: string): string {
    return this.keyboardService.getTextFontSize(text);
  }

  addMacro(keyElement: any):void {
    console.log(keyElement);
    let key = keyElement[2];
    let shortName = keyElement[1];
    let name = keyElement[0];

    if(this.macroKeysAux.length < 5)
    {
      let data = [name,shortName]
      const indexToAdd = this.macroKeys.length - 1;
      this.macroKeysAux.splice(indexToAdd, 0, data);
      this.macroKeys.splice(indexToAdd, 0, key);
    }
  }

  removeMacro(index: number): void {
    if (index >= 0 && index < this.macroKeys.length-1) {
      this.macroKeysAux.splice(index, 1);
      this.macroKeys.splice(index, 1);
    }
  }

  editMacro():void {

  }

  saveMacro():void {

    let keyAux = this.deepdeckMacros[this.selectedMacroIndex];

    keyAux.name = this.macroName;
    keyAux.key = this.macroKeys;
       
    this.apiService.updateMacro(keyAux).subscribe(
      response => {
        console.log(response);
        alert("Macro Saved");
        this.router.navigate(['/macros']); 
      },
      (error) => {
        // Connection failed
        alert("En error ocurred. Try again");
        console.error(error); // Log the error for debugging purposes
      }
    );
  }

  // this.apiService.getCurrentConfigData(true).subscribe(
  //   () => {
  //     // Connection successful
  //     this.isConnected = true;
  //     this.loading = false; // Set loading state to false
  //   },
  //   (error) => {
  //     // Connection failed
  //     this.isConnected = false;
  //     console.error(error); // Log the error for debugging purposes
  //     this.loading = false; // Set loading state to false
  //   }


  // saveLayer(){ 
    
  //   const modifiedJson = JSON.parse(JSON.stringify(this.layer));
  //   for (const item of modifiedJson.row0) {
  //     delete item.key_code_name;
  //   }
  //   for (const item of modifiedJson.row1) {
  //     delete item.key_code_name;
  //   }
  //   for (const item of modifiedJson.row2) {
  //     delete item.key_code_name;
  //   }
  //   for (const item of modifiedJson.row3) {
  //     delete item.key_code_name;
  //   }

  //   console.log(modifiedJson);    
  //   if(this.uuid){ 
  //     this.apiService.updateLayersLayout(modifiedJson).subscribe(response => {
  //       console.log(response);
  //       this.router.navigate(['/keymap']); 
  //     });
  //   } else {
  //     this.apiService.createLayer(modifiedJson).subscribe(response => {
  //       console.log(response);
  //       this.router.navigate(['/keymap']); 
  //     })
  //   }
  // }

  deleteMacro():void {

  }

  pressMacroKey(index: number): void {

    // Remove the zeros at the end (just leave 1)
    this.selectedMacroIndex = index;

    //store info of the key for showing in the UI
    this.macroName = this.deepdeckMacros[index].name;
    this.macroShortName = this.keylist_macros[index][0];
    this.showMacroSection = true;

    let tmp_key: number[] = this.deepdeckMacros[index].key;

    const zeroIndex = tmp_key.findIndex(num => num === 0);
    if (zeroIndex !== -1) {
      tmp_key = tmp_key.slice(0, zeroIndex + 1);
    }

    //Search short and long name of the key, and save an array with it.
    this.macroKeysAux = [];
      for (let key of tmp_key) {

        this.macroKeysAux.push( [this.keyboardService.GetKeyNameByKeyCode(key),
                              this.keyboardService.GetKeyShortNameByKeyCode(key)] );
    }
    this.macroKeys = tmp_key;
    console.log(this.macroKeys);
    console.log(this.macroKeysAux);
  }

  pressKey(keyElement: any):void {
    this.addMacro(keyElement);
  }

}
