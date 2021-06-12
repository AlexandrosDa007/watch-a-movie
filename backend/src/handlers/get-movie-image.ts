import express from 'express';
import { readFileSync } from 'fs';
import { METADATA } from '../helpers/get-metadata';

export function getMovieImage(req: express.Request, res: express.Response) {
    const id = req.params.id;

    const movie = METADATA.movies[id];

    if (!movie) {
        return res.status(400).send('Movie does not exists!');
    }
    try {
        const image = readFileSync(`movies/${movie.imagePath}`, 'binary');
        return res.send(image);
    } catch (error) {
        console.error(error);
        return res.status(501).send('Something went wrong!');
    }
}
