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

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService, // Inject ApiService
    private router: Router // Inject the Router
  ) {
    this.element = data.element;
  }

  isLoading = false;

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.isLoading = true;
    const uuid = this.element.uuid;
  
    this.apiService
      .deleteElement(uuid)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (response) => {
          // Handle successful delete
          this.dialogRef.close(true);
  
          // Reload the current page
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/keymap']);
          });
  
        },
        (error) => {
          // Handle error and display a message
          if (error.status === 400) {
            alert('An error occurred while deleting the element: ' + error.error.message);
          } else {
            alert('An error occurred while deleting the element.');
          }
        }
      );
  }
}