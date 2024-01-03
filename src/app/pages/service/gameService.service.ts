import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GamesItem } from '../games/games-datasource';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameServiceService {
  constructor(private http: HttpClient) {}

  getAllGames(): any {
    return this.http.get<any>('http://localhost:8080/games');
  }

  getGameById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/games/${id}`);
  }

  reccomendGame(genres: string[], compatibility: number, limit: number) {
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

    return this.http.get('http://localhost:8080/paged', { params });
  }

  getByGameName(name: string) {
    let params = new HttpParams().set('name', name);

    return this.http.get('http://localhost:8080/games/name', { params });
  }
}
