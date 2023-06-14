import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component decorator specifying the component's selector, associated HTML and CSS files.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

/**
 * Class representing a user login form component in the application.
 */
export class UserLoginFormComponent implements OnInit {
  /**
   * Input decorator defining user data object.
   * @type {{ UserName: string, Password: string }}
   */
  @Input() userData = { UserName: '', Password: '' };

  /**
   * Constructor for the UserLoginFormComponent class.
   * @param fetchApiData {FetchApiDataService} - The data fetching service to be used.
   * @param dialogRef {MatDialogRef} - The dialog reference for this component.
   * @param snackBar {MatSnackBar} - The service for displaying snack bars.
   * @param router {Router} - The Angular Router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Method for logging in a user.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('UserName', result.user.UserName);
      localStorage.setItem('token', result.token);
      this.dialogRef.close();
      this.snackBar.open('Login successful', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}