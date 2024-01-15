import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GameServiceService } from '../service/gameService.service';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmationDialog',
  templateUrl: './confirmationDialog.component.html',
  styleUrls: ['./confirmationDialog.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class ConfirmationDialogComponent implements OnInit {
  selectedData: any;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service: GameServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  selectedValue(event: MatSelectChange) {
    this.selectedData = {
      value: event.value,
    };
  }

  send(data: any) {
    this.selectedData;
    if (this.selectedData.value == 'yes') {
      let data = this.data.dataKey;
      this.service
        .deleteGame(data.id)
        .pipe(first())
        .subscribe(() => console.log(data));
      this._snackBar.open('Usunięto Grę', 'Zamknij', { duration: 2000 });
    } else {
      this._snackBar.open('Nie usunięto gry', 'Zamknij', { duration: 2000 });
    }
    this.dialogRef.close();
  }
}
