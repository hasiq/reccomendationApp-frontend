import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { GamesItem } from './games-datasource';
import { GameServiceService } from '../service/gameService.service';
import { catchError, first, startWith, switchMap, map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatButtonModule,
  ],
})
export class GamesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<GamesItem>;

  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;

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
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadData();
    });
    this.table.dataSource = this.dataSource;

    this.loadData();
  }

  loadData() {
    this.service
      .sortAndPaginate(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.totalItems = 101;
        this.dataSource = data;
      });
  }

  constructor(private service: GameServiceService) {}

  // fetchAllGames() {
  //   this.service
  //     .getAllGames()
  //     .pipe(first())
  //     .subscribe(
  //       (games: any) => (
  //         (this.dataSource = games), console.log(this.dataSource)
  //       )
  //     );
  // }

  ngOnInit(): void {
    // this.fetchAllGames();
    this.loadData();
  }
}
