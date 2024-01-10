import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GamesItem } from '../games/games-datasource';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class GameServiceService {
  constructor(private http: HttpClient) {}

  getAllGames(): any {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.get<any>('http://localhost:8080/games', { headers });
  }

  getGameById(id: number): Observable<any> {
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    return this.http.get<any>(`http://localhost:8080/games/${id}`);
  }

  reccomendGame(genres: string[], compatibility: number, limit: number) {
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    return this.http.post('http://localhost:8080/games/recommend', {
      genres,
      compatibility,
      limit,
    });
  }

  sortAndPaginate(pageNumber: Number, pageSize: Number): Observable<any> {
    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNo', pageNumber.toString());

    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    return this.http.get('http://localhost:8080/paged', { params });
  }

  getByGameName(name: string) {
    let params = new HttpParams().set('name', name);
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };

    return this.http.get('http://localhost:8080/games/name', {
      params,
    });
  }

  getAuthToken(): string | null {
    return window.sessionStorage.getItem('auth');
  }

  countAllGames() {
    return this.http.get('http://localhost:8080/count');
  }

  editGame(id: number, body: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.put(`http://localhost:8080/games/${id}`, body, {
      headers,
    });
  }

  deleteGame(id: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.delete(`http://localhost:8080/games/${id}`, {
      headers,
    });
  }

  logged = false;
}
