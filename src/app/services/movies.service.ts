import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    constructor() { }

    getMovies(): Observable<Movie[]> {
        const movies = [
            {
                id: 'movie_1',
                title: 'Avengers',
                airDate: '20-05-2020',
                imageUrl: 'https://via.placeholder.com/150',
                duration: 100,
            },
            {
                id: 'movie_2',
                title: 'Avengers2',
                airDate: '20-05-2021',
                imageUrl: 'https://via.placeholder.com/150',
                duration: 110,
            },
        ] as Movie[];
        movies.push(...movies);
        movies.push(...movies);
        movies.push(...movies);
        movies.push(...movies);
        movies.push(...movies);
        movies.push(...movies);
        return of(movies);
    }
}