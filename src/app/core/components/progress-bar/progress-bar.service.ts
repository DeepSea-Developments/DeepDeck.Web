import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private bufferValue: BehaviorSubject<number>;
  private mode: BehaviorSubject<string>;
  private value: BehaviorSubject<number>;
  private visible: BehaviorSubject<boolean>;

  constructor(
    private router: Router
  ) {

    this.bufferValue = new BehaviorSubject(0);
    this.mode = new BehaviorSubject('indeterminate');
    this.value = new BehaviorSubject(0);
    this.visible = new BehaviorSubject(false);

    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationStart))
    //   .subscribe(() => {
    //     this.showBar();
    //   });

    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel))
    //   .subscribe(() => {
    //     this.hideBar();
    //   });
  }


  get getBufferValue(): Observable<any> {
    return this.bufferValue.asObservable();
  }

  setBufferValue(value: number): void {
    this.bufferValue.next(value);
  }


  get getMode(): Observable<any> {
    return this.mode.asObservable();
  }

  setMode(value: 'determinate' | 'indeterminate' | 'buffer' | 'query'): void {
    this.mode.next(value);
  }

  get getValue(): Observable<any> {
    return this.value.asObservable();
  }

  setValue(value: number): void {
    this.value.next(value);
  }

  get getVisible(): Observable<any> {
    return this.visible.asObservable();
  }

  showBar(): void {
    this.visible.next(true);
  }

  hideBar(): void {
    this.visible.next(false);
  }
}

