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

  keylist_macros = this.keyboardService.getKeyListMacro();
  keylist_macros_selection = this.keyboardService.getKeyListMacroSelection();

  deepdeckMacros = [];

  selectedMacroIndex: number;
  macroShortName = ""
  macroName = ""
  showMacroSection: boolean = false;
  showDeepDeckMacros: boolean = true;

  // Nuevas variables para el estado de la macro seleccionada
  macroType: number = 0;
  osType: number = 0; // 0: Windows por defecto
  appName: string = "";

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
    
    // Aseguramos que se guarden con los nombres que el firmware entiende
    keyAux.macro_type = Number(this.macroType); 
    keyAux.os_type = Number(this.osType);
    keyAux.app_alias = this.macroType != 0 ? this.appName : "";

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

  deleteMacro():void {

  }

  pressMacroKey(index: number): void {

    // 1. Guardar el índice seleccionado
    this.selectedMacroIndex = index;
    const selectedMacro = this.deepdeckMacros[index];

    // 2. Cargar información básica
    this.macroName = selectedMacro.name;
    this.macroShortName = this.keylist_macros[index][0];
    this.showMacroSection = true;

    // 3. CORRECCIÓN: Nombres de campos según el JSON del API
    // Usamos el operador || para asignar un valor por defecto si el campo viene nulo o indefinido
    this.macroType = selectedMacro.macro_type !== undefined ? selectedMacro.macro_type : 0;
    this.osType = selectedMacro.os_type !== undefined ? selectedMacro.os_type : 0;
    this.appName = selectedMacro.app_alias || '';

    // 4. Procesar las teclas (Keycodes)
    let tmp_key: number[] = selectedMacro.key || [];

    // Eliminar ceros al final
    const zeroIndex = tmp_key.findIndex(num => num === 0);
    if (zeroIndex !== -1) {
      tmp_key = tmp_key.slice(0, zeroIndex + 1);
    }

    // 5. Traducir keycodes a nombres para la UI
    this.macroKeysAux = [];
    for (let key of tmp_key) {
      this.macroKeysAux.push([
        this.keyboardService.GetKeyNameByKeyCode(key),
        this.keyboardService.GetKeyShortNameByKeyCode(key)
      ]);
    }

    this.macroKeys = tmp_key;
  }

  pressKey(keyElement: any):void {
    this.addMacro(keyElement);
  }

  toggleDDMacros(): void {
    this.showDeepDeckMacros = !this.showDeepDeckMacros;
  }

}
