import { Component } from '@angular/core';
import { KeyboardService } from 'src/app/core/services/keyboard/keyboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

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

  keylist_macros = this.keyboardService.getKeyListMacro();
  keylist_macros_selection = this.keyboardService.getKeyListMacroSelection();

  deepdeckMacros = [];

  selectedMacroIndex: number;
  macroShortName = ""
  macroName = ""
  showMacroSection: boolean = false;
  showDeepDeckMacros: boolean = true;

  ngOnInit(): void {  
    
    this.apiService.getMacros()
      .subscribe(
        value => {
          this.deepdeckMacros = value.macros;
          this.deepdeckMacros.unshift({
            "name": "new_add_macro",
            "keycode": "new_add_macro"
          })
          console.log('getMacros ',this.deepdeckMacros);
        }
      );

  }

  onTabHeaderFocusChanged(event: FocusEvent): void {
    event.preventDefault();
  }

  getTextFontSize(text: string): string {
    return this.keyboardService.getTextFontSize(text);
  }

  handleNewAddMacro(){
    //consumo api para crearlo

    //Ultimo item Macro
    const itemMacro = this.deepdeckMacros[this.deepdeckMacros.length -1];
    const nameMacro = parseInt(itemMacro.keycode) + 2;
    const keyCodeMacro = parseInt(itemMacro.keycode) + 1; 

    if(this.keylist_macros[this.keylist_macros.length -1][2] > keyCodeMacro){
      const item = {
        "name": `macro_${nameMacro}`,
        "keycode": keyCodeMacro,
        "key": [0,0,0,0,0]
      } 
  
      //Agrego el new macro al poll macro
      this.deepdeckMacros.push(item);
    }else{
      //analizar funcion populateKeyListMacro en keybiard.service.ts para mejorar , 
      alert("Can't add more macro")
    }

  }

  handleDeleteMacro(){
    let keyAux = this.deepdeckMacros[this.selectedMacroIndex];

    keyAux.name = this.macroName;
    keyAux.key = this.macroKeys;

    console.log('keyAux ',keyAux);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { element: keyAux }, // Pass the element object
    });
  
    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
       console.log('hola desde borrar')
      }
    });

  }

  addMacro(keyElement: any):void {
    console.log('addMacro ',keyElement);
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
        console.log('apiService updateMacro ',response);
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
    console.log('pressMacroKey macroKeys', this.macroKeys);
    console.log('pressMacroKey macroKeysAux', this.macroKeysAux);
  }

  pressKey(keyElement: any):void {
    this.addMacro(keyElement);
  }

  toggleDDMacros(): void {
    this.showDeepDeckMacros = !this.showDeepDeckMacros;
  }

}
