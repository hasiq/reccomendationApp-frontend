import { HttpClient } from '@angular/common/http';
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
}