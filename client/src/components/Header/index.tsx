import { AppBar, Box, styled, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthState, useAuth } from "../../context/AuthContext";

const Container = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Actions = styled(Box)(() => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
}));

const Link = styled(RouterLink)(() => ({
  textDecoration: "none",
  color: "#ffffff",
}));

export default function Header() {
  const { user, logOut } = useAuth() as AuthState;

  const handleLogOut = () => {
    logOut();
  };

  return (
    <AppBar position="static">
      <Container px={4} py={2}>
        <Link to="/">
          <Typography variant="h4">Funny Movies</Typography>
        </Link>
        {user ? (
          <Actions>
            <Typography mr={6}>👋 {user?.username || ""}</Typography>
            <Link to="/share">Share a movie</Link>
            <Link to="" onClick={handleLogOut}>
              Logout
            </Link>
          </Actions>
        ) : (
          <Actions>
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Register</Link>
          </Actions>
        )}
      </Container>
    </AppBar>
  );
}
