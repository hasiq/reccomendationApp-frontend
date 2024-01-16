import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../../service/gameService.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-gameDetails',
  templateUrl: './gameDetails.component.html',
  styleUrls: ['./gameDetails.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule],
})
export class GameDetailsComponent implements OnInit {
  dataSource?: any;
  gameid?: number;
  displayedColumns = [
    'ID',
    'name',
    'author',
    'release date',
    'description',
    'genre',
  ];

  constructor(
    private service: GameServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameid = parseInt(id || '2');
    return this.service
      .getGameById(this.gameid)
      .pipe(first())
      .subscribe(
        (data: any) => ((this.dataSource = data))
      );
  }
}
