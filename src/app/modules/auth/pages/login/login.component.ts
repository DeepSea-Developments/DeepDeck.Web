import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ProgressBarService } from 'src/app/core/components/progress-bar/progress-bar.service';
import { ModalComponent } from 'src/app/modules/modal/modal.component'

declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  showErrorMessage = false;
  hide = true;
  showInvalidForm = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public apiService: ApiService,
    public formBuilder: FormBuilder,
    public progressBar: ProgressBarService,
    public dialog: MatDialog
    //public dialog: MatDialog,
    // public _notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.progressBar.showBar();
    if (this.loginForm.dirty && this.loginForm.valid) {
      const formulario = this.loginForm.value;

      this.showInvalidForm = false;
      this.submitted = true;
      this.authService.login(formulario).subscribe(
        answer => {
          this.submitted = false;
          this.progressBar.hideBar();
          this.router.navigateByUrl('/network',);
        },
        error => {
          this.submitted = false;
          if (error.status === 401) {
            this.showErrorMessage = true;
            this.progressBar.hideBar();
          }
        }
      )
    } else {
      this.showInvalidForm = true;
      console.log('formulario inválido');
    }
  }

  ngAfterViewInit() {
    this.submitted = true;
    if (this.authService.isLoggedIn() == true) {
      this.router.navigateByUrl('/network');
    } else {
      this.submitted = false;
      this.router.navigateByUrl('/session');
    }
  }

  showRetrieveDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
