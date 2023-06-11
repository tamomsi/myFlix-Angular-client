import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component'; // Import the MovieDetailsComponent

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  showMovieDetails(movie: any): void {
    this.router.navigate(['/movie-details', movie._id]);
  }

  openDirector(directorName: string): void {
    this.fetchApiData.getDirector(directorName).subscribe((response: any) => {
      this.openDirectorDialog(response);
    });
  }

  openDirectorDialog(director: any): void {
    const dialogRef = this.dialog.open(DirectorComponent, {
      width: '400px',
      data: director,
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any logic after the dialog is closed (if needed)
    });
  }

  fetchGenreDetails(genreName: string): void {
    this.fetchApiData.getGenre(genreName).subscribe((response: any) => {
      this.openGenreDialog(response);
    });
  }

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
}
