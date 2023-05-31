import { styled } from "@mui/material";

export const MovieWrapper = styled("div")(() => ({
  paddingTop: "56.25%",
  position: "relative",
}));

export const MovieIframe = styled("iframe")(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}));
