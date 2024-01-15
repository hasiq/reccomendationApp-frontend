import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
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
      name: [''],
      lastName: [''],
      login: [''],
      password: [''],
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
      .subscribe((data) => console.log(data));
    this.form.reset();
    this._snackBar.open('Dodano użytkownika', 'Ok');
    this.router.navigate(['/login']);
  }
}
