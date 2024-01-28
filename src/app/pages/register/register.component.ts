import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../service/user.service';
import { first } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['',Validators.required],
      login: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  Register() {
    this.service
      .register(
        this.form.controls['login'].value,
        this.form.controls['password'].value,
        this.form.controls['name'].value,
        this.form.controls['lastName'].value
      )
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.form.reset();
          this._snackBar.open('Dodano użytkownika', 'Zamknij', {
            duration: 2500,
          });
          this.router.navigate(['/login']);
        },
        error: () => {
          this._snackBar.open('Taki użytkownik już istnieje', 'Zamknij', {
            duration: 2500,
          });
        },
      });
  }
}
