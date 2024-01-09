import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { GameServiceService } from '../service/gameService.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { GenreService } from '../service/genre.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-editFilm',
  templateUrl: './editFilm.component.html',
  styleUrls: ['./editFilm.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    CommonModule,
  ],
})
export class EditFilmComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: GameServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private genreService: GenreService,
    public dialogRef: MatDialogRef<EditFilmComponent>
  ) {
    console.log(data);
    console.log(data.dataKey.name);
    console.log(data.dataKey.id);
    console.log(data.dataKey.genre.name);
    console.log(data.dataKey.description);
  }

  genres: any = [];

  ngOnInit() {
    this.genreService
      .getAllGenres()
      .pipe(first())
      .subscribe((data) => {
        this.genres = data;
      });
    let game = this.data.dataKey;
    this.form = this.fb.group({
      name: [game.name],
      description: [game.description],
      author: [game.author],
      genre: [this.selectedChips],
      releaseDate: [game.releaseDate],
    });
  }

  selectedChips: string[] = [];

  selected(genres: string) {
    const index = this.selectedChips.indexOf(genres);

    if (index >= 0) {
      this.selectedChips.splice(index, 1);
    } else {
      this.selectedChips.push(genres);
    }
  }
  edit(data: any) {
    this.service
      .editGame(this.data.dataKey.id, data.value)
      .pipe(first())
      .subscribe(() => {
        console.log(data);
        console.log(data.value.description);
      });
    this.dialogRef.close();
  }
}
