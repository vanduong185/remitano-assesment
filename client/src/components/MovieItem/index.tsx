import { Grid, Typography } from "@mui/material";
import React from "react";
import { Movie } from "../../api/movies/typings";
import { MovieIframe, MovieWrapper } from "./styles";

export type MovieItemProps = {
  movie: Movie;
};

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <Grid container columnSpacing={3} mb={3}>
      <Grid item xs={6}>
        <MovieWrapper>
          <MovieIframe src={movie.movieUrl} frameBorder="0" />
        </MovieWrapper>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h5" mb={1}>
          {movie.movieTitle}
        </Typography>
        <Typography variant="body1" mb={2}>
          Shared by: {movie.user.username}
        </Typography>
        <Typography variant="body1">
          Description: {movie.movieDescription}
        </Typography>
      </Grid>
    </Grid>
  );
}
