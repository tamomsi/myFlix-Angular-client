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
  public favoriteMovies: any[] = []; // Add a new array to store favorite movies
  public editMode: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const UserName = localStorage.getItem('UserName');
    if (UserName) {
      this.fetchApiData.getUser(UserName).subscribe((user) => {
        this.userProfile = user;
        this.getFavoriteMovies(); // Fetch and display favorite movies from local storage
      });
      // Get favorite movies from local storage
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favoriteMovies = JSON.parse(storedFavorites);
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }

  getFavoriteMovies(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoriteMovieIds = JSON.parse(storedFavorites);
      this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
        this.favoriteMovies = movies
          .filter((movie: any) => favoriteMovieIds.includes(movie._id))
          .map((movie: any) => {
            return {
              ImagePath: movie.ImagePath,
              Title: movie.Title
            };
          });
      });
    }
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
      // Handle error if needed
    });
  }
}
