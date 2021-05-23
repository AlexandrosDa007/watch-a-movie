import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  destroy$ = new EventEmitter();
  movies: Movie[];
  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.moviesService.getMovies().pipe(takeUntil(this.destroy$))
      .subscribe(movies => {
        console.log(movies);

        this.movies = movies;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }
}
