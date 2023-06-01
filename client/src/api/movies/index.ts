import { axios } from "../../configs/axiosConfig";
import newAxios from "axios";
import { Movie, MovieDetails, ShareMoviePayload } from "./typings";

const API_KEY = process.env.REACT_APP_GG_API_KEY;

export const getMovieDetail = async (
  movieId: string
): Promise<MovieDetails | undefined> => {
  const { data } = await newAxios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${movieId}&key=${API_KEY}&part=snippet&fields=items(id,snippet(title,description))`
  );
  const movie = data?.items?.[0];
  if (!movie) return undefined;
  return {
    movieId: movie.id,
    title: movie.snippet?.title,
    description: movie.snippet?.description,
  };
};

export const getListMovies = () => {
  return axios.get<Movie[]>("/movies");
};

export const shareMovie = (payload: ShareMoviePayload) => {
  return axios.post<Movie>("/movies", payload);
};
