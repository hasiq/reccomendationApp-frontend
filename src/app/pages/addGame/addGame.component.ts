import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GameServiceService } from '../service/gameService.service';
import { first } from 'rxjs';
import { EditGameComponent } from '../editGame/editGame.component';
import { GenreService } from '../service/genre.service';

@Component({
  selector: 'app-addGame',
  templateUrl: './addGame.component.html',
  styleUrls: ['./addGame.component.css'],
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
export class AddGameComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: GameServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private genreService: GenreService,
    public dialogRef: MatDialogRef<AddGameComponent>
  ) {}

  genres: any = [];

  ngOnInit() {
    this.genreService
      .getAllGenres()
      .pipe(first())
      .subscribe((data) => {
        this.genres = data;
      });
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      releaseDate: ['', Validators.required],
      steamLink: ['', Validators.required],
      review: ['', Validators.required],
      genre: [this.selectedChips],
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
  add(data: any) {
    this.service
      .addGame(data.value)
      .pipe(first())
      .subscribe(() => {
        console.log(data);
        console.log(data.value.description);
        console.log(data.value.steamLink);
      });
    this.dialogRef.close();
  }
}
