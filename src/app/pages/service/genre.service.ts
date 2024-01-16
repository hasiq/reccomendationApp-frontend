import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}
  localhost: string = 'http://localhost:8080';

  getAllGenres() {
    
    return this.http.get(this.localhost + '/genres');
  }

  getAuthToken(): any {
    return window.sessionStorage.getItem('auth');
  }
}
