import { Component, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../service/user.service';
import { first } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { GameServiceService } from '../service/gameService.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  decoded: any;
  static role: any;
  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private router: Router,
    private gamesService: GameServiceService
  ) {}
  userData: any;
  ngOnInit() {
    this.form = this.fb.group({
      login: [''],
      password: [''],
    });
  }

  Login() {
    console.log(this.form.controls['login'].value);
    console.log(this.form.controls['password'].value);
    this.service
      .login(
        this.form.controls['login'].value,
        this.form.controls['password'].value
      )
      .pipe(first())
      .subscribe((data: any) => {
        sessionStorage.setItem('auth', data.token);
        this.decoded = jwtDecode(data.token);
        console.log(this.decoded);
        // (this.userData = data),
        //   console.log(this.userData.token),
      });
    this.gamesService.logged = true;
    const delayInMilliseconds = 100;

    setTimeout(() => {
      this.router.navigate(['/games']);
    }, delayInMilliseconds);
  }
}
