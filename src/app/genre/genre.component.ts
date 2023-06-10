import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  genre: { Name: string, Description: string };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.genre = data;
  }

  ngOnInit(): void {}

  fetchGenreDetails(): void {
    
  }
}
