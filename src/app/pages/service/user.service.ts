import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    return this.http.post('http://localhost:8080/login', { login, password });
  }

  register(
    login: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    return this.http.post('http://localhost:8080/register', {
      login,
      password,
      firstName,
      lastName,
    });
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth');
  }
}
