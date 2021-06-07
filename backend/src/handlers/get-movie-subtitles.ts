import express from 'express';
import { readFileSync } from 'fs';
import { send } from 'process';
import { METADATA } from '../helpers/get-metadata';


export function getMovieSubtitles(req: express.Request, res: express.Response) {
    const id = req.params.id;

    const movie = METADATA.movies[id];
    if (!movie){
        return res.status(400).send('This movie does not exists!');
    }

    const subsPath = movie.subsPath;
    if (!subsPath) {
        return res.status(400).send('');
    }
    const subs = readFileSync(`public/movies/${subsPath}`, 'utf-8');
    return res.send(subs);
}
