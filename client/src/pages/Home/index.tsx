import { Box, CircularProgress, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getListMovies } from "../../api/movies";
import { Movie } from "../../api/movies/typings";
import MovieItem from "../../components/MovieItem";
import SharedMovieNoti from "../../components/SharedMovieNoti";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await getListMovies();
      setMovies(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
      <Box py={4}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
        )}
      </Box>
      <SharedMovieNoti />
    </Container>
  );
}
