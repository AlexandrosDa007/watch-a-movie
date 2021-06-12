import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { Metadata } from '../models/metadata';
import { SettingsService } from './settings.service';
@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    constructor(
        private httpClient: HttpClient,
        private settingsService: SettingsService,
    ) { }

    getMovies(): Observable<Movie[]> {
        const serverConfig$ = this.settingsService.getServerConfig();
        const movies$ = serverConfig$.pipe(
            switchMap(serverConfig => {
                return this.httpClient.get<Metadata>(`${serverConfig.host}:${serverConfig.port}/metadata.json`).pipe(
                    map(metadata => Object.values(metadata.movies)),
                    map(movies => {
                        return movies.map(movie => {
                            movie.path = `${serverConfig.host}:${serverConfig.port}/movies/video/${movie.id}`;
                            movie.subs = `${serverConfig.host}:${serverConfig.port}/movies/subtitles/${movie.id}`;
                            movie.imageUrl = movie.image ? `${serverConfig.host}:${serverConfig.port}/movies/${movie.image}` : 'assets/no-image.png';
                            return movie;
                        });
                    })
                );
            }),
            catchError(err => {
                console.error(err.message);
                alert(err.message);
                return of([]);
            }),
        );
        return movies$;
    }

    getMovie(id: string): Observable<Movie> {
        return this.getMovies().pipe(
            map(movies => {
                return movies.find(movie => movie.id === id);
            }),
        );
    }

    getStuff() {
        return this.httpClient.get(`http://localhost:3100/kati.srt`);
    }
}