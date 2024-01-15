import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { GameServiceService } from '../service/gameService.service';
import { first, pipe } from 'rxjs';

@Component({
  selector: 'app-favoriteGames',
  templateUrl: './favoriteGames.component.html',
  styleUrls: ['./favoriteGames.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class FavoriteGamesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource?: any;
  displayedColumns = [
    'ID',
    'name',
    'author',
    'release date',
    'gameDetails',
    'deleteGame',
  ];

  constructor(private service: GameServiceService) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;

    this.loadData();
  }

  loadData() {
    this.service
      .findFavoriteGames(pipe(first()))
      .subscribe((data) => (this.dataSource = data));
  }

  delete(id: any) {
    let data = this.dataSource[id];
    this.service
      .deleteFavorite(data.id)
      .pipe(first())
      .subscribe(() => this.loadData());
  }

  
}
