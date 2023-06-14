import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component'; // Import the MovieDetailsComponent

/**
 * A component that represents a movie card.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  /**
   * Constructs a new MovieCardComponent.
   * @param fetchApiData - The service to fetch data from the API
   * @param router - The Angular router
   * @param dialog - The service to handle dialogs
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.getMovies();
    const UserName = localStorage.getItem('UserName');
    if (UserName) {
      this.fetchApiData.getFavoriteMovies(UserName).subscribe((resp: any) => {
        this.favorites = resp;
        console.log(this.favorites);
      });
  
      // Load favorites from localStorage
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    }
  }

  /**
   * Checks if a movie is a favorite.
   * @param movieId - The ID of the movie
   * @returns True if the movie is a favorite; false otherwise
   */
  isFavorite(movieId: string): boolean {
    return this.favorites.includes(movieId);
  }

  /**
   * Fetches all movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Shows the details of a movie.
   * @param movie - The movie whose details to show
   */
  showMovieDetails(movie: any): void {
    this.router.navigate(['/movie-details', movie._id]);
  }

  /**
   * Opens the director dialog.
   * @param directorName - The name of the director
   */
  openDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((response: any) => {
      this.openDirectorDialog(response);
    });
  }

  /**
   * Opens the director dialog with data.
   * @param director - The director data
   */
  openDirectorDialog(director: any): void {
    const dialogRef = this.dialog.open(DirectorComponent, {
      width: '400px',
      data: director,
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any logic after the dialog is closed (if needed)
    });
  }

  /**
   * Fetches the details of a genre.
   * @param genreName - The name of the genre
   */
  fetchGenreDetails(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((response: any) => {
      this.openGenreDialog(response);
    });
  }

  /**
   * Opens the genre dialog with data.
   * @param genre - The genre data
   */
  openGenreDialog(genre: any): void {
    const dialogRef = this.dialog.open(GenreComponent, {
      width: '400px',
      data: {
        Name: genre.Name,
        Description: genre.Description
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any logic after the dialog is closed (if needed)
    });
  }

    /**
   * Opens the movie details dialog with data.
   * @param movie - The movie data
   */
  openMovieDetailsDialogWithData(movie: any): void {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '400px',
      data: {
        title: movie.Title,
        genre: movie.Genre.Name,
        director: movie.Director.Name,
        description: movie.Description
      },
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // Handle any logic after the dialog is closed (if needed)
    });
  }

  /**
   * Adds a movie to the favorites.
   * @param movieId - The ID of the movie to add
   */
  addToFavorites(movieId: string): void {
    const UserName = localStorage.getItem('UserName');
    if (UserName) {
      this.fetchApiData.addMovieToFavorites(movieId, UserName).subscribe((response: any) => {
        console.log(response);
        this.favorites.push(movieId);
        localStorage.setItem('favorites', JSON.stringify(this.favorites)); // Store favorites in localStorage
        window.alert("Movie added to favorites");
      });
    } else {
      window.alert("User not logged in");
    }
  }
  
    /**
   * Removes a movie from the favorites.
   * @param movieId - The ID of the movie to remove
   */
  removeFromFavorites(movieId: string): void {
    const UserName = localStorage.getItem('UserName');
    if (UserName) {
      this.fetchApiData.deleteFavoriteMovie(movieId, UserName).subscribe((response: any) => {
        console.log(response);
        const index = this.favorites.indexOf(movieId);
        if (index > -1) {
          this.favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(this.favorites)); // Update favorites in localStorage
        window.alert("Movie removed from favorites");
      });
    } else {
      window.alert("User not logged in");
    }
  }
}