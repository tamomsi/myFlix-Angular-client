import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  @Input() movieId?: string;
  movie: any;

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    if (this.movieId) {
      this.fetchMovieDetails(this.movieId);
    }
  }

  fetchMovieDetails(movieId: string): void {
    this.fetchApiData.getMovie(movieId).subscribe((response: any) => {
      this.movie = response;
    });
  }
}
