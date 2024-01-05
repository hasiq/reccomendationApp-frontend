import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private http: HttpClient) {}

  getAllGenres() {
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    // console.log(headers);
    // console.log(decode);
    return this.http.get('http://localhost:8080/genres');
  }

  getAuthToken(): any {
    return window.localStorage.getItem('auth');
  }
}
