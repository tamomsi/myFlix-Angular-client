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
  public favoriteMovies: any[] = []; 
  public editMode: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router) {}

  ngOnInit(): void {
    const UserName = localStorage.getItem('UserName');
    if (UserName) {
      this.fetchApiData.getUser(UserName).subscribe((user) => {
        this.userProfile = user;
        this.getFavoriteMovies(UserName); // Pass UserName as an argument
      });
      // Get favorite movies from local storage
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favoriteMovies = JSON.parse(storedFavorites);
      }
    }
  }

  goBack() {
    this.router.navigate(['/movies']); 
  }

  getFavoriteMovies(UserName: string) {
    this.fetchApiData.getFavoriteMovies(UserName).subscribe((movies) => {
        this.favoriteMovies = movies;
    });
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
