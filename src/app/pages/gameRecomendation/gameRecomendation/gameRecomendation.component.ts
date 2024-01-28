import { DataSource } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { GameServiceService } from '../../service/gameService.service';
import { elementAt, first, raceWith } from 'rxjs';
import { GenreService } from '../../service/genre.service';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from '../../login/login.component';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
@Component({
  selector: 'app-gameRecomendation',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatSliderModule,
    FormsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    ShareButtonModule,
    ShareIconsModule,
  ],
  templateUrl: './gameRecomendation.component.html',
  styleUrls: ['./gameRecomendation.component.css'],
})
export class GameRecomendationComponent implements OnInit {
  gamesForm!: FormGroup;
  data?: any;
  genres: any = [];
  role = LoginComponent.role;

  displayedColumns = ['ID', 'name', 'distance', 'similarity', 'share'];
  static value: number;
  constructor(
    private fb: FormBuilder,
    private service: GameServiceService,
    private service2: GenreService
  ) {}

  ngOnInit() {
    this.gamesForm = this.fb.group({
      limit: ['', [Validators.max(100), Validators.required]],
    });

    this.switchTable();

    return this.service2
      .getAllGenres()
      .pipe(first())
      .subscribe((data) => (this.genres = data));
  }

  selectedChips: string[] = [];

  recommendGamesByGenres(genres: string) {
    const index = this.selectedChips.indexOf(genres);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(genres);
    }
  }

  recommend() {
    console.log(this.selectedChips);
    console.log(GameRecomendationComponent.value);
    console.log(this.gamesForm.controls['limit'].value);
    this.service
      .reccomendGame(
        this.selectedChips,
        GameRecomendationComponent.value,
        this.gamesForm.controls['limit'].value
      )
      .pipe(first())
      .subscribe((data: any) => {
        let dataInfo: any = [];
        for (var row of data) {
          dataInfo.push({
            id: row.id,
            name: row.name,
            compatibility: row.compatibility,
            info:
              'Dla podanych gatunków : ' +
              this.selectedChips +
              '  została mi polecona gra: ' +
              row.name +
              ' o takim podobieństwie: ' +
              (1 - row.compatibility) * 100 +
              '%' +
              ', link do strony: ',
          });
        }
        this.data = dataInfo;
      });
  }

  add(id: any) {
    let data = this.data[id];
    this.service
      .addToFavorities(data.id)
      .pipe(first())
      .subscribe((data) => console.log(data));
  }

  switchTable() {
    if (this.role != '') {
      this.displayedColumns = [
        'ID',
        'name',
        'distance',
        'review',
        'similarity',
        'addGame',
        'share',
      ];
    }
  }
}
