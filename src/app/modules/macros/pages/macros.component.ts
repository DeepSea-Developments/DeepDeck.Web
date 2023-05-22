import { Component } from '@angular/core';
import { KeyboardService } from 'src/app/core/services/keyboard/keyboard.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss']
})
export class MacrosComponent {

  constructor(
    private keyboardService: KeyboardService, 
    public dialog: MatDialog,
  ) { }

  macroKeys = ["Hello","its","me"];

  objectKeys = Object.keys;

  keyList_basic = this.keyboardService.getKeyListBasic();
  keylist_functions = this.keyboardService.getKeyListFunctions();
  keylist_media = this.keyboardService.getKeyListMedia();
  keylist_mouse = this.keyboardService.getKeyListMouse();
  keylist_macros = this.keyboardService.getKeyListMacro();

  selectedMacroIndex: number;

  onTabHeaderFocusChanged(event: FocusEvent): void {
    event.preventDefault();
  }

  getTextFontSize(text: string): string {
    return this.keyboardService.getTextFontSize(text);
  }

  addMacro():void {
    this.macroKeys.push("hello");
  }

  removeMacro(index: number): void {
    if (index >= 0 && index < this.macroKeys.length) {
      this.macroKeys.splice(index, 1);
    }
  }

  pressMacroKey(index: number): void {
    this.selectedMacroIndex = index;
  }

}
