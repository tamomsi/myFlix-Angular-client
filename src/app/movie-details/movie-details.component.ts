import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * A component that represents the details of a movie.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    /**
   * Constructs a new MovieDetailsComponent.
   * @param data - The data for the movie details. This includes the title, genre, director, and description of the movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      genre: string;
      director: string;
      description: string;
    }
  ) {}

    /**
   * Initializes the component.
   */
  ngOnInit(): void {}
}
