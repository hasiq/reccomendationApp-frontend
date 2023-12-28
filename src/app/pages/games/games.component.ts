import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { GamesItem } from './games-datasource';
import { GameServiceService } from '../service/gameService.service';
import { first } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, RouterModule],
})
export class GamesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GamesItem>;
  dataSource?: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'ID',
    'name',
    'author',
    'release date',
    'gameDetails',
    'editGame',
    'deleteGame',
  ];

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  constructor(private service: GameServiceService) {}

  fetchAllGames() {
    this.service
      .getAllGames()
      .pipe(first())
      .subscribe(
        (games: any) => (
          (this.dataSource = games), console.log(this.dataSource)
        )
      );
  }

  ngOnInit(): void {
    this.fetchAllGames();
  }
}
