export interface PublicMetadata {
    movies: Record<string, PublicMovie>;
}

interface PublicMovie {
    id: string;
    title: string;
    duration: string;
    airDate: string;
}

// TODO
interface PublicSeries {
    id: string;
    title: string;
    duration: string;
    airDate: string;
}

