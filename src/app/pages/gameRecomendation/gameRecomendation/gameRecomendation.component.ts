import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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
import { elementAt, first } from 'rxjs';
import { GenreService } from '../../service/genre.service';
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
  ],
  templateUrl: './gameRecomendation.component.html',
  styleUrls: ['./gameRecomendation.component.css'],
})
export class GameRecomendationComponent implements OnInit {
  gamesForm!: FormGroup;

  genres: any = [];
  static value: number;
  constructor(
    private fb: FormBuilder,
    private service: GameServiceService,
    private service2: GenreService
  ) {}

  ngOnInit() {
    this.gamesForm = this.fb.group({
      limit: ['', Validators.max(100)],
    });

    return this.service2
      .getAllGenres()
      .pipe(first())
      .subscribe((data) => (this.genres = data));
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 100) + '';
    }
    GameRecomendationComponent.value = value;
    return `${value}`;
  }

  selectedChips: string[] = [];

  // chipChanged(event: any): void {
  //   const changedChip = event.source;
  //   this.selectedChips = [];
  //   if (changedChip && changedChip.value && changedChip.selected) {
  //     this.selectedChips.push(changedChip.value);
  //   } else {
  //     const index = this.selectedChips.indexOf(changedChip.value);

  //     if (index >= 0) {
  //       this.selectedChips.splice(index, 1);
  //     }
  //   }
  // }

  recommendGamesByGenres(genres: string) {
    const index = this.selectedChips.indexOf(genres);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(genres);
    }
  }

  reccomend() {
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
      .subscribe((data) => console.log(data));
  }
}
