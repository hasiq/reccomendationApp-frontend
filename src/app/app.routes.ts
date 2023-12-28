import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { GameDetailsComponent } from './pages/gameDetails/gameDetails/gameDetails.component';
import { AppComponent } from './app.component';
import { GameRecomendationComponent } from './pages/gameRecomendation/gameRecomendation/gameRecomendation.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GameDetailsComponent },
  { path: 'recommend', component: GameRecomendationComponent },
];
