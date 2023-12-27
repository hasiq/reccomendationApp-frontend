import { Routes } from '@angular/router';
import { AppNavComponent } from './pages/app-nav/app-nav.component';
import { GamesComponent } from './pages/games/games.component';
import { GameDetailsComponent } from './pages/gameDetails/gameDetails/gameDetails.component';

export const routes: Routes = [
  { path: '', component: AppNavComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GameDetailsComponent },
];
