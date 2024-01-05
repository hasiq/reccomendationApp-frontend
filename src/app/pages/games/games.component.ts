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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

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
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
})
export class GamesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<GamesItem>;
  searched = false;
  gamesForm!: FormGroup;
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;
  token = window.localStorage.getItem('auth');

  dataSource?: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ID', 'name', 'author', 'release date', 'gameDetails'];
  sort: any;

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
      .countAllGames()
      .pipe(first())
      .subscribe((data: any) => (this.totalItems = data));
    this.service
      .sortAndPaginate(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        this.dataSource = data;
      });
  }

  constructor(private service: GameServiceService, private fb: FormBuilder) {}

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
    this.gamesForm = this.fb.group({
      name: [''],
    });
    this.switchTable();
  }

  findGame() {
    this.searched = true;
    let name = this.gamesForm.controls['name'].value;
    return this.service
      .getByGameName(this.gamesForm.controls['name'].value)
      .pipe(first())
      .subscribe(
        (data: any) =>
          (this.dataSource = data.filter((data: any) =>
            data.name.includes(name)
          ))
      );
  }

  AllGames() {
    this.loadData();
    this.searched = false;
    this.gamesForm.reset();
  }

  switchTable() {
    if (this.token != null) {
      this.displayedColumns = [
        'ID',
        'name',
        'author',
        'release date',
        'gameDetails',
        'editGame',
        'deleteGame',
      ];
    }
  }
}
