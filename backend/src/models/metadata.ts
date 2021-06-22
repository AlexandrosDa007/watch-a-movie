export interface Metadata {
    movies: Record<string, Movie>;
}

interface Movie {
    id: string;
    videoPath: string;
    imagePath: string;
    subsPath: string;
}
// TODO
interface Series {
}

