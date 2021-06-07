import express from 'express';
import cors from 'cors';
import { getMovieVideo } from './handlers/get-movie-video';
import { getMovieSubtitles } from './handlers/get-movie-subtitles';
import { getMovieImage } from './handlers/get-movie-image';
import { downloadMovie } from './handlers/download-movie';
const app = express();
app.use(cors());
app.use(express.static('public'));

app.listen('3100');

app.get('/movies/video/:id', getMovieVideo);

app.get('/movies/subtitles/:id', getMovieSubtitles);

app.get('/movies/image/:id', getMovieImage);

app.get('/downloads/movies/:id', downloadMovie);