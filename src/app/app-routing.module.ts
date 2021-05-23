import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'series',
    component: SeriesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
