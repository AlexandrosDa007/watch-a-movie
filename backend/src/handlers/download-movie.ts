import express from 'express';
import { METADATA } from '../helpers/get-metadata';
import JSZip from 'jszip';
import { readdirSync, readFileSync, statSync } from 'fs';


export async function downloadMovie(req: express.Request, res: express.Response) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ success: false, message: 'No movie id was provided!' });
    }

    const movie = METADATA.movies[id];

    if (!movie) {
        return res.status(400).json({ success: false, message: 'No movie with this id exists!' });
    }

    const rootPath = `public/movies/${movie.rootPath}`;


}
