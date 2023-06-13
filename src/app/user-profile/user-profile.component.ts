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

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.some((favorite) => favorite._id === movieId);
  }  
  
  addToFavorites(movieId: string): void {
    const UserName = localStorage.getItem('UserName');
    if (UserName) {
      this.fetchApiData.addMovieToFavorites(movieId, UserName).subscribe((response: any) => {
        console.log(response);
        this.favoriteMovies.push(movieId);
        localStorage.setItem('favorites', JSON.stringify(this.favoriteMovies)); // Store favorites in localStorage
        window.alert("Movie added to favorites");
      });
    } else {
      window.alert("User not logged in");
    }
  }
  
  removeFromFavorites(movieId: string): void {
    const index = this.favoriteMovies.findIndex((favorite) => favorite._id === movieId);
    if (index > -1) {
      this.favoriteMovies.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteMovies)); // Update favorites in localStorage
      window.alert("Movie removed from favorites");
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
