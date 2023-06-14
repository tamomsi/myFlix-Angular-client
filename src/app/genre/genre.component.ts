import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component decorator specifying the component's selector, associated HTML and CSS files.
 */
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})

/**
 * Class representing a genre component in the application.
 */
export class GenreComponent implements OnInit {
  /**
   * The genre object containing details about the genre.
   * @type {{ Name: string, Description: string }}
   */
  genre: { Name: string, Description: string };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.genre = data;
  }

  ngOnInit(): void {}

  /**
   * Method for fetching genre details.
   */
  fetchGenreDetails(): void {
    
  }
}
