import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * A component that represents the welcome page.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

/**
 * A class representing the welcome page component.
 */
export class WelcomePageComponent implements OnInit {
  /**
   * Constructs a new WelcomePageComponent.
   * @param dialog - Service to open Material Design modal dialogs.
   */
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   */
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}