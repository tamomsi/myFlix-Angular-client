import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})

/**
 * Class representing a director component in the application.
 */
export class DirectorComponent implements OnInit {
  /**
   * Constructor for the DirectorComponent class.
   * @param data {Object} - The data injected into the component, representing a director's details.
   * @param data.Name {string} - The name of the director.
   * @param data.Bio {string} - The biography of the director.
   * @param data.Birth {string} - The birth date of the director.
   * @param data.Death {string} - The death date of the director.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
      Death: string;
    }
  ) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {}
}
