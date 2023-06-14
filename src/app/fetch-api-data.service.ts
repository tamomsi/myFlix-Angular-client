import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapToCanActivateChild } from '@angular/router';

const apiUrl = 'https://tamarflix.herokuapp.com/';

  /**
   * FetchApiDataService is a service providing methods for interacting with the movie API.
   * @injectable
   */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * @param http - A HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Register a new user.
   * @param userDetails - The details of the user to register
   * @returns An Observable of the HTTP response
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Log in a user.
   * @param userDetails - The details of the user to log in
   * @returns An Observable of the HTTP response
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies.
   * @returns An Observable of the HTTP response
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get a specific movie.
   * @param movieId - The ID of the movie to retrieve
   * @returns An Observable of the HTTP response
   */
  public getMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get movies by a specific director.
   * @param directorName - The name of the director
   * @returns An Observable of the HTTP response
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get movies of a specific genre.
   * @param genreName - The name of the genre
   * @returns An Observable of the HTTP response
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
   
  /**
   * Get user details.
   * @param UserName - The name of the user
   * @returns An Observable of the HTTP response
   */
  public getUser(UserName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + UserName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
   
  /**
   * Get favorite movies of a user.
   * @param UserName - The name of the user
   * @returns An Observable of the HTTP response
   */
  public getFavoriteMovies(UserName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + UserName + '/movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to a user's favorites.
   * @param movieId - The ID of the movie
   * @param UserName - The name of the user
   * @returns An Observable of the HTTP response
   */
  public addMovieToFavorites(movieId: string, UserName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + UserName + '/movies/' + movieId, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Edit a user's details.
   * @param userDetails - The new details of the user
   * @returns An Observable of the HTTP response
   */
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userDetails.UserName, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Delete a user.
   * @param UserName - The name of the user
   * @returns An Observable of the HTTP response
   */
  public deleteUser(UserName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + UserName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  /**
   * Remove a movie from a user's favorites.
   * @param movieId - The ID of the movie
   * @param UserName - The name of the user
   * @returns An Observable of the HTTP response
   */
  public deleteFavoriteMovie(movieId: string, UserName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + UserName + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }  

  /**
   * Extracts data from the response.
   * @param res - The HTTP response
   * @returns The response data or an empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handle an HTTP error.
   * @param error - The HTTP error
   * @returns Throws an error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } 
     else if (error.error.errors) {
      return throwError(() => new Error(error.error.errors[0].msg));
    }
    else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}