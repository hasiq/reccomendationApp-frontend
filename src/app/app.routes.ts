import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { GameDetailsComponent } from './pages/gameDetails/gameDetails/gameDetails.component';
import { AppComponent } from './app.component';
import { GameRecomendationComponent } from './pages/gameRecomendation/gameRecomendation/gameRecomendation.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FavoriteGamesComponent } from './pages/favoriteGames/favoriteGames.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GameDetailsComponent },
  { path: 'recommend', component: GameRecomendationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'favorities', component: FavoriteGamesComponent },
];
