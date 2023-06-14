import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * A component that represents the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input data for user registration form.
   */
  @Input() userData = { UserName: '', Password: '', email: '', Birthday: '' };

  /**
   * Constructs a new UserRegistrationFormComponent.
   * @param fetchApiData - Service to fetch API data.
   * @param dialogRef - Reference to the dialog opened by this component.
   * @param snackBar - Service to dispatch Material Design snack bar messages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Registers a new user.
   */
  registerUser(): void{
    this.fetchApiData.userRegistration(this.userData). subscribe((result) =>{
      console.log(result)
      this.dialogRef.close();
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (result)=>{
      this.snackBar.open('User registration successful', 'OK', {
     duration: 2000 
        });
      }
    );
  }
}
