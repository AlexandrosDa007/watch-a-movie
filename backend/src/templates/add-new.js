const electron = require('electron');
const { ipcRenderer } = electron;

let allMovies = [];

let MODE = 'create';

// Elements reference
const movieId = document.getElementById('movieId');
const movieTitle = document.getElementById('movieTitle');
const movieDuration = document.getElementById('movieDuration');
const movieAirdate = document.getElementById('movieAirdate');
const movieImage = document.getElementById('movieImage');
const movieVideo = document.getElementById('movieVideo');
const movieSubtitles = document.getElementById('movieSubtitles');
const errorSpan = document.getElementById('error');
const createMovieBtn = document.getElementById('create-movie');


ipcRenderer.on('movies:get', async (ev, { movies, movie }) => {
    if (movie) {
        console.log({ movie });
        // prepare edit mode
        movieId.value = movie.id;
        movieTitle.value = movie.title;
        movieDuration.value = movie.duration;
        movieAirdate.value = movie.airDate;
        movieImage.files = await getFileListFromPath(movie.imagePath + 'asf');
        movieVideo.files = await getFileListFromPath(movie.videoPath);
        movieSubtitles.files = await getFileListFromPath(movie.subsPath);
        console.log({ movieImage });
        console.log({ movieVideo });
        console.log({ movieSubtitles });
        MODE = 'edit';
    }
    allMovies = movies;
});



// Add click event listener
createMovieBtn.addEventListener('click', (ev) => {
    const id = movieId.value;
    const title = movieTitle.value;
    const duration = Number.parseFloat(movieDuration.value);
    const airDate = movieAirdate.value;
    const imagePath = movieImage.files[0]?.path;
    const videoPath = movieVideo.files[0]?.path;
    const subsPath = movieSubtitles.files[0]?.path;

    const movie = {
        id,
        title,
        duration,
        airDate,
        imagePath,
        videoPath,
        subsPath,
    };
    const missingProperties = validateMovie(movie);
    if (missingProperties.length !== 0) {
        // show error
        errorSpan.innerHTML = `<span class="error">Some fields are empty</span><br>`;
        missingProperties.forEach(prop => errorSpan.innerHTML += `<span>${prop}</span><br>`);
        return;
    }
    if (MODE === 'edit') {
        ipcRenderer.send('movie:add', (ev, movie));
        return;
    }
    console.log({ movie });
    const idExists = !!Object.keys(allMovies || {}).find(id => id === movie.id);
    console.log({ idExists });
    if (!idExists) {
        ipcRenderer.send('movie:add', (ev, movie));
    } else {
        console.error('SKATA', movie);
    }
});

/**
 * Validates if the movie that was provided has 
 * the requierd properties
 * @param {object} movie 
 * @returns An array containing the properties that
 * are not presend in the movie
 */
function validateMovie(movie) {
    const movieProperties = ['id', 'title', 'duration', 'airDate', 'imagePath', 'videoPath', 'subsPath'];
    return movieProperties.filter(prop => !movie[prop]);
}

/**
 * Creates a new file list and adds the files
 * that were provided
 * @param {File[]} files 
 * @returns A list of files
 */
function FileListItems(files) {
    var b = new ClipboardEvent("").clipboardData || new DataTransfer()
    for (var i = 0, len = files.length; i < len; i++) b.items.add(files[i])
    return b.files;
}

/**
 * Retrieves a new file list with the file from
 * the path that was provided
 * @param {string} path 
 * @returns A new file list
 */
async function getFileListFromPath(path) {
    try {
        const response = await fetch(`file://${path}`);
        const blob = await response.blob();
        const nameOfFileParts = path.split('/');
        const filename = nameOfFileParts[nameOfFileParts.length - 1];
        const file = new File([blob], path);
        file.path = path;
        // a.remove();  //afterwards we remove the element again         
        return new FileListItems([file]);
    } catch (error) {
        console.error(error);
    }
}

