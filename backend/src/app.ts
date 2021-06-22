import express from 'express';
import cors from 'cors';
import { getMovieVideo } from './handlers/get-movie-video';
import { getMovieSubtitles } from './handlers/get-movie-subtitles';
import { getMovieImage } from './handlers/get-movie-image';
import { BrowserWindow, app, Menu, ipcMain } from 'electron';
import * as url from 'url';
import * as path from 'path';
import { MenuItemConstructorOptions } from 'electron/main';
import { readFileSync, outputFileSync } from 'fs-extra';
import { getPrivateMetadata, getPublicMetadata, setPrivateMetadata, setPublicMetadata } from './helpers/get-metadata';


const expressApp = express();
expressApp.use(cors());
expressApp.use(express.static('public'));

expressApp.listen('3100');

expressApp.get('/movies/video/:id', getMovieVideo);

expressApp.get('/movies/subtitles/:id', getMovieSubtitles);

expressApp.get('/movies/image/:id', getMovieImage);


// SET UP ELECTRON
let mainWindow: BrowserWindow = null as unknown as BrowserWindow;
let createMovieWindow: BrowserWindow = null as unknown as BrowserWindow;

app.on('ready', (ev) => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'templates/index.html'),
        protocol: 'file:',
        slashes: true,
    }));
    mainWindow.webContents.toggleDevTools();
    mainWindow.on('close', (ev) => {
        app.quit();
    });
    mainWindow.webContents.on('did-finish-load', (ev: any) => {
        const publicMetadata = getPublicMetadata();
        const privateMetadata = getPrivateMetadata();
        mainWindow.webContents.send('metadata', { publicMetadata, privateMetadata });
    });
});

/**
 * Creates a new window to add movies/series
 */
function createAddWindow(context: { movies: Record<string, any>, movie?: any }) {
    createMovieWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    createMovieWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'templates/add-new.html'),
        protocol: 'file:',
        slashes: true,
    }));
    createMovieWindow.webContents.toggleDevTools();
    createMovieWindow.webContents.on('did-finish-load', (ev: any) => {
        createMovieWindow.webContents.send('movies:get', context);
    });
}


ipcMain.on('movie:create', (ev) => {
    if (!createMovieWindow || createMovieWindow.isDestroyed()) {
        const allMovies = getPublicMetadata().movies;
        const context = {
            movies: allMovies,
        };
        createAddWindow(context);
    }
});


ipcMain.on('movie:add', (ev, newMovie: any) => {
    // write new movie
    createMovieWindow.close();
    const publicMetadata = getPublicMetadata();
    publicMetadata.movies[newMovie.id] = {
        airDate: newMovie.airDate,
        duration: newMovie.duration,
        id: newMovie.id,
        title: newMovie.title,
    };
    const privateMetadata = getPrivateMetadata();
    privateMetadata.movies[newMovie.id] = {
        id: newMovie.id,
        imagePath: newMovie.imagePath,
        subsPath: newMovie.subsPath,
        videoPath: newMovie.videoPath,
    };

    // write to file
    setPublicMetadata(publicMetadata);
    setPrivateMetadata(privateMetadata);
    // update main window
    mainWindow.webContents.send('metadata', { publicMetadata, privateMetadata });
});


ipcMain.on('movie:result', (ev, newMovie) => {
    createMovieWindow.webContents.send('movie:result', newMovie);
});


ipcMain.on('movie:edit', (ev, movie) => {
    if (!createMovieWindow || createMovieWindow.isDestroyed()) {
        const allPublicMovies = getPublicMetadata().movies;
        const allPrivateMovies = getPrivateMetadata().movies;
        const context = {
            movies: allPublicMovies,
            movie,
        };
        createAddWindow(context);
    }
});
