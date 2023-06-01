import {
  Button,
  Container,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Field, FormField } from "./typings";
import { parseVideoIdFromYoutubeLink } from "../../utilities/helper";
import { getMovieDetail, shareMovie } from "../../api/movies";
import { AuthState, useAuth } from "../../context/AuthContext";

const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "500px",
  padding: "3rem",
  margin: "3rem auto",
  border: "1px solid #ddd",
  borderRadius: "10px",
}));

export default function Share() {
  const { user } = useAuth() as AuthState;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: FormField) => {
    setIsSubmitting(true);
    try {
      const movieId = parseVideoIdFromYoutubeLink(values[Field.LINK]);
      if (movieId) {
        const movie = await getMovieDetail(movieId);
        if (movie && user) {
          const { data } = await shareMovie({
            movieUrl: `https://www.youtube.com/embed/${movie.movieId}`,
            movieTitle: movie.title,
            movieDescription: movie.description?.substring(0, 100),
          });
          if (data) toast("Shared movie successfully", { type: "success" });
          else toast("Shared movie failed", { type: "error" });
        } else toast("Not found movie", { type: "error" });
      } else toast("The link is invalid", { type: "error" });
    } catch (error) {
      toast("Error", { type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik<FormField>({
    initialValues: {
      [Field.LINK]: "",
    },
    validationSchema: Yup.object().shape({
      [Field.LINK]: Yup.string().url("Invalid URL").required("Required"),
    }),
    onSubmit,
  });

  const getError = useCallback(
    (field: Field) => {
      return formik.touched[field] && formik.errors[field];
    },
    [formik]
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Container>
      <Wrapper>
        <Typography variant="h4" mb={4}>
          Share A Movie
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            name={Field.LINK}
            label="Youtube URL"
            fullWidth
            margin="normal"
            error={!!getError(Field.LINK)}
            helperText={getError(Field.LINK)}
            value={formik.values[Field.LINK]}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3 }}
            disabled={isSubmitting}
          >
            Share
          </Button>
        </Box>
      </Wrapper>
    </Container>
  );
}
