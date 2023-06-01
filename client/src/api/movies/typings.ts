export type Movie = {
  id: number;
  userId: number;
  movieUrl: string;
  movieDescription: string;
  movieTitle: string;
  user: {
    username: string;
  };
};

export type MovieDetails = {
  movieId: string;
  description: string;
  title: string;
};

export type ShareMoviePayload = {
  movieUrl: string;
  movieTitle: string;
  movieDescription: string;
};
