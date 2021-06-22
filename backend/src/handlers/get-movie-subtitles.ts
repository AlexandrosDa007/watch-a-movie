import express from 'express';
import { readFileSync } from 'fs';
import { getPrivateMetadata } from '../helpers/get-metadata';


export function getMovieSubtitles(req: express.Request, res: express.Response) {
    const id = req.params.id;
    const metadata = getPrivateMetadata();
    const movie = metadata.movies[id];
    if (!movie){
        return res.status(400).send('This movie does not exists!');
    }

    const subsPath = movie.subsPath;
    if (!subsPath) {
        return res.status(400).send('');
    }
    try {
        const subs = readFileSync(`public/movies/${subsPath}`, 'utf-8');
        return res.send(subs);
    } catch (error) {
        console.error(error);
        return res.status(501).send('Something went wrong!');
    }
}
