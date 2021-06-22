const electron = require('electron');
const { ipcRenderer } = electron;
const main = document.getElementById('main');
const newMovieBtn = document.getElementById('new-movie-btn');
const metadataJSON = localStorage.getItem('metadata');



let METADATA = metadataJSON ? JSON.parse(metadataJSON) : {};
ipcRenderer.on('metadata', (ev, metadata) => {
    console.log(metadata);
    METADATA = metadata;
    localStorage.setItem('metadata', JSON.stringify(METADATA));
    loadMovies();
});

function addMovie(movie) {
    METADATA.movies[movie.id] = movie;
    localStorage.setItem('metadata', JSON.stringify(METADATA));
}

function removeMovie(movie) {
    delete METADATA.movies[movie.id];
    localStorage.setItem('metadata', JSON.stringify(METADATA));
}

function loadMovies() {
    main.innerHTML = ''
    const allMovies = {};
    const movieEditButtons = [];
    Object.keys(METADATA.publicMetadata?.movies || {}).forEach(movieId => {
        const movie = {
            ...METADATA.privateMetadata.movies[movieId],
            ...METADATA.publicMetadata.movies[movieId],
        };
        const editMovieButtonId = `edit-btn-${movie.id}`;
        allMovies[movie.id] = movie;
        movieEditButtons.push({ id: editMovieButtonId, movieId: movie.id });
        const html = String.raw`
            <div class="movie">
                <span>ID: ${movie.id}</span>
                <span>TITLE: ${movie.title}</span>
                <button id="${editMovieButtonId}">Edit</button>
            </div>
        `;
        /*
        <span>${movie.duration}</span>
                <span>${movie.airDate}</span>
                <span>${movie.imagePath}</span>
                <span>${movie.videoPath}</span>
                <span>${movie.subsPath}</span>
        */
        main.innerHTML += html;

    });

    movieEditButtons.forEach(buttonInfo => {
        const button = document.getElementById(buttonInfo.id);
        button.addEventListener('click', (ev) => editMovie(allMovies[buttonInfo.movieId]));
    })

}

loadMovies();

newMovieBtn.addEventListener('click', (ev) => {
    console.log('pressed');
    ev.preventDefault();
    ipcRenderer.send('movie:create');
});


// ipcRenderer.on('movie:add', (ev, newMovie) => {
//     const idExists = !!Object.keys(METADATA.movies || {}).find(id => id === newMovie.id);
//     console.log({ idExists });
//     ipcRenderer.send('movie:result', (ev, !idExists));
// });

function editMovie(movie) {
    console.log('editing', movie);
    ipcRenderer.send('movie:edit', movie);
}