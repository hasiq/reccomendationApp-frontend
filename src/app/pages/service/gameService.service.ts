import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GamesItem } from '../games/games-datasource';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class GameServiceService {
  localhost: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  getAllGames(): any {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.get<any>('/api/games', { headers });
  }

  getGameById(id: number): Observable<any> {
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    return this.http.get<any>(this.localhost + '/games/' + id);
  }

  reccomendGame(genres: string[], compatibility: number, limit: number) {
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };
    return this.http.post(this.localhost + '/games/recommend', {
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
    return this.http.get(this.localhost + '/paged', { params });
  }

  getByGameName(name: string) {
    let params = new HttpParams().set('name', name);
    // let decode = this.getAuthToken();
    // let headers = {};
    // headers = { Authorization: 'Bearer ' + decode };

    return this.http.get(this.localhost + '/games/name', {
      params,
    });
  }

  getAuthToken(): string | null {
    return window.sessionStorage.getItem('auth');
  }

  countAllGames() {
    return this.http.get(this.localhost + '/count');
  }

  editGame(id: number, body: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.put(this.localhost + `/games/${id}`, body, {
      headers,
    });
  }

  deleteGame(id: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.delete(this.localhost + `/games/${id}`, {
      headers,
    });
  }

  addGame(data: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.post(this.localhost + '/game', data, { headers });
  }

  findFavoriteGames(id: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.get(this.localhost + '/favorite', { headers });
  }

  deleteFavorite(id: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.delete(this.localhost + `/favorite/${id}`, {
      headers,
    });
  }

  addToFavorities(id: any) {
    let decode = this.getAuthToken();
    let headers = {};
    headers = { Authorization: 'Bearer ' + decode };
    return this.http.post(this.localhost + `/favorite/${id}`, null, {
      headers,
    });
  }

  logged = false;
}
