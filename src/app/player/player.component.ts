import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MoviesService } from '../services/movies.service';
import { SettingsService, SubtitleFontSize } from '../services/settings.service';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  movie: Movie;
  subtitleFontSize: SubtitleFontSize;
  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private settingsService: SettingsService,
  ) { }

  destroy$ = new EventEmitter();

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        console.log(params);
        const id = params.get('id');
        const movie$ = this.moviesService.getMovie(id);
        return movie$;
      }))
      .subscribe(movie => {
        this.movie = movie;
      });

    this.settingsService.getSubtitleSize().pipe(takeUntil(this.destroy$))
      .subscribe(subtitleFontSize => this.subtitleFontSize = subtitleFontSize);
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }


  download(): void {
    
  }

}
