import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

    /**
     * Retrieves all movies
     */
    getMovies(): Observable<Movie[]> {
        const serverConfig$ = this.settingsService.getServerConfig();
        const movies$ = serverConfig$.pipe(
            switchMap(serverConfig => {
                return this.httpClient.get<Metadata>(`${serverConfig.host}:${serverConfig.port}/metadata`).pipe(
                    map(metadata => {
                        console.log('metadata', metadata);

                        return Object.values(metadata.movies);
                    }),
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
    /**
     * Retrieve a specific movie
     * @param id The movie ID
     */
    getMovie(id: string): Observable<Movie> {
        return this.getMovies().pipe(
            map(movies => {
                return movies.find(movie => movie.id === id);
            }),
        );
    }
}
