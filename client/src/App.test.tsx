import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Funny Movies logo", async () => {
  render(<App />);
  const linkElement = screen.getByText(/Funny Movies/i);
  expect(linkElement).toBeInTheDocument();
});
