import { EditGameComponent } from '../editGame/editGame.component';
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
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterModule,
} from '@angular/router';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AddGameComponent } from '../addGame/addGame.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmationDialog/confirmationDialog.component';

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
    MatDialogModule,
  ],
})
export class GamesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<GamesItem>;
  searched = false;
  dialogRef!: any;
  gamesForm!: FormGroup;
  pageSize = 10;
  pageIndex = 0;
  totalItems = 0;
  token: any = window.sessionStorage.getItem('auth');
  dataSource?: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ID', 'name', 'author', 'release date', 'gameDetails'];
  sort: any;
  search: string = '';
  mySubscription: any;
  role: any = LoginComponent.role;
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

  constructor(
    private service: GameServiceService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private snackBar: MatSnackBar,
    private snackBar1: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    // this.fetchAllGames();
    this.loadData();
    this.gamesForm = this.fb.group({
      name: [''],
    });
    this.switchTable();
  }

  findGame() {
    if (this.gamesForm.controls['name'].value == '') {
      this.loadData();
    }
    this.searched = true;
    this.search = this.gamesForm.controls['name'].value;
    let splited = this.search.split(' ');
    let name = this.toInitCase(splited);
    return this.service
      .getByGameName(name)
      .pipe(first())
      .subscribe(
        (data: any) =>
          (this.dataSource = data.filter((data: any) =>
            data.name.includes(name)
          ))
      );
  }

  switchTable() {
    if (this.role == 'admin') {
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

  toInitCase(name: any): string {
    for (let i = 0; i < name.length; i++) {
      name[i] = name[i][0].toUpperCase() + name[i].substr(1);
    }

    return name.join(' ');
  }

  logout() {
    console.log(window.sessionStorage.getItem('auth'));
    window.sessionStorage.removeItem('auth');
    this.router.navigate([this.router.url]);
    LoginComponent.role = '';
    this.service.logged = false;
    this.snackBar1.open('Wylogowano', 'Zamknij', { duration: 3000 });
  }

  edit(gameId: any) {
    this.dialog.open(EditGameComponent, {
      height: '300px',
      data: {
        dataKey: this.dataSource[gameId],
      },
    });
    this.dialog.afterAllClosed.subscribe(
      () => (
        this.loadData(),
        this._snackBar.open('Zmodyfikowano Grę', 'Zamknij', { duration: 3000 })
      )
    );
  }

  delete(id: any) {
    this.dialog.open(ConfirmationDialogComponent, {
      height: '300px',
      width: '300px',
      data: {
        dataKey: this.dataSource[id],
      },
    });
    this.dialog.afterAllClosed.subscribe(() => this.loadData());
  }

  add() {
    this.dialog.open(AddGameComponent, {
      height: '200px',
    });
    this.dialog.afterAllClosed.subscribe(
      () => (
        this.loadData(),
        this.snackBar.open('Dodano Grę', 'Zamknij', { duration: 3000 })
      )
    );
  }
}
