import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  constructor(
    private httpClient: HttpClient,
  ) { }

  async ngOnInit(): Promise<void> {
    // const base64 = await this.httpClient.get<string>(this.movie.imageUrl).toPromise();
    // console.log(base64);
    
    // this.movie.base64 = base64;
    
  }

  playMovie(movie: Movie): void {
    console.log(movie);
    
  }
}
