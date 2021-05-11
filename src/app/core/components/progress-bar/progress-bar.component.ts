import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProgressBarService } from 'src/app/core/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  bufferValue: number;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value: number;
  visible: boolean;

  private subject: Subject<any>;

  constructor(
    private progressBarService: ProgressBarService
  ) {
    this.subject = new Subject();
  }

  ngOnInit(): void {
    this.progressBarService.getBufferValue
      .pipe(takeUntil(this.subject))
      .subscribe((bufferValue) => {
        this.bufferValue = bufferValue;
      });

    this.progressBarService.getMode
      .pipe(takeUntil(this.subject))
      .subscribe((mode) => {
        this.mode = mode;
      });

    this.progressBarService.getValue
      .pipe(takeUntil(this.subject))
      .subscribe((value) => {
        this.value = value;
      });

    this.progressBarService.getVisible
      .pipe(takeUntil(this.subject))
      .subscribe((visible) => {
        this.visible = visible;
      });
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
