import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  element: any;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService, // Inject ApiService
    private router: Router // Inject the Router
  ) {
    this.element = data.element;
    this.isLoading = false;
  } 

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    console.log('onConfirmClick ',this.element )
    this.isLoading = true;
    //this.dialogRef.close(true);
  }
}