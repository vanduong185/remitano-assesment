import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Field, FormField } from "./typings";
import { registerUser } from "../../api/users";

const signupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(6, "Confirm password must be at least 6 characters")
    .required("Required")
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: FormField) => {
    try {
      setIsSubmitting(true);
      const { data } = await registerUser({
        username: values[Field.EMAIL],
        password: values[Field.PASSWORD],
      });
      if (data) {
        toast("Register successfully", { type: "success" });
      }
    } catch (error) {
      toast("Register failed", { type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik<FormField>({
    initialValues: {
      [Field.EMAIL]: "",
      [Field.PASSWORD]: "",
      [Field.CONFIRM_PASSWORD]: "",
    },
    validationSchema: signupSchema,
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

  const onLoginClickHandler = () => {
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={8}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            name={Field.EMAIL}
            label="Email Address *"
            fullWidth
            margin="normal"
            error={!!getError(Field.EMAIL)}
            helperText={getError(Field.EMAIL)}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            name={Field.PASSWORD}
            label="Password *"
            type="password"
            fullWidth
            margin="normal"
            error={!!getError(Field.PASSWORD)}
            helperText={getError(Field.PASSWORD)}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <TextField
            name={Field.CONFIRM_PASSWORD}
            label="Confirm Password *"
            type="password"
            fullWidth
            margin="normal"
            error={!!getError(Field.CONFIRM_PASSWORD)}
            helperText={getError(Field.CONFIRM_PASSWORD)}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3, mb: 3 }}
          >
            Submit
          </Button>
          <Button
            fullWidth
            variant="text"
            sx={{ mb: 2 }}
            onClick={onLoginClickHandler}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
