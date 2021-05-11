import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';    

@Injectable({
  providedIn: 'root'
})
export class EventCollapseService {

  invokeCollapseFunction = new EventEmitter();    
  subsVar: Subscription;   

  constructor() { }

  onCollapseButtonClick() {    
    this.invokeCollapseFunction.emit();    
  } 
}
