import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userProfile: any = {};
  public editMode: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router) {}

  ngOnInit(): void {
    const UserName = localStorage.getItem('UserName');
    if (UserName) {
      this.fetchApiData.getUser(UserName).subscribe((user) => {
        this.userProfile = user;
      });
    }
  }

  goBack() {
    this.router.navigate(['/movies']); // Adjust this path to match your movie card view path
}

cancelEdit(): void {
  this.editMode = false;
}

  enableEditMode(): void {
    this.editMode = true;
  }

  saveProfile(): void {
    this.fetchApiData.editUser(this.userProfile).subscribe((response) => {
      this.editMode = false; 
    }, (error) => {
    });
  }
}
