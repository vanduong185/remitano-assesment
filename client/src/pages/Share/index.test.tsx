import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Share from "./";
import { ToastContainer } from "react-toastify";

jest.mock("../../context/AuthContext", () => {
  return {
    useAuth: () => ({
      user: {
        id: 1,
      },
    }),
  };
});

jest.mock("../../api/movies");
const { shareMovie, getMovieDetail } = require("../../api/movies");

test("renders share title", () => {
  render(<Share />);
  const title = screen.getByText(/Share A Movie/i);
  expect(title).toBeInTheDocument();
});

test("share url successfully", async () => {
  shareMovie.mockImplementation(() => ({
    data: {},
  }));
  getMovieDetail.mockImplementation(() => ({}));

  render(
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <Share />
    </>
  );
  const url = "https://www.youtube.com/watch?v=chdLDqOfcwk";

  const input = screen.getByLabelText("Youtube URL") as any;
  fireEvent.change(input, {
    target: { value: url },
  });
  expect(input.value).toBe(url);

  const shareButton = screen.getByRole("button", {
    name: "Share",
  });
  expect(shareButton).toBeInTheDocument();

  fireEvent.click(shareButton);

  expect(await screen.findByText("Shared movie successfully")).toBeVisible();
});

test("share url invalid link", async () => {
  render(
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <Share />
    </>
  );
  const url = "https://www.youtube.com/watch?v=9SnAO_QYRG";

  const input = screen.getByLabelText("Youtube URL") as any;
  fireEvent.change(input, {
    target: { value: url },
  });
  expect(input.value).toBe(url);

  const shareButton = screen.getByRole("button", {
    name: "Share",
  });
  expect(shareButton).toBeInTheDocument();

  fireEvent.click(shareButton);

  expect(await screen.findByText("The link is invalid")).toBeVisible();
});

test("share url not found movie", async () => {
  getMovieDetail.mockImplementation(() => undefined);

  render(
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <Share />
    </>
  );
  const url = "https://www.youtube.com/watch?v=9SnAO_QYRGi";

  const input = screen.getByLabelText("Youtube URL") as any;
  fireEvent.change(input, {
    target: { value: url },
  });
  expect(input.value).toBe(url);

  const shareButton = screen.getByRole("button", {
    name: "Share",
  });
  expect(shareButton).toBeInTheDocument();

  fireEvent.click(shareButton);

  expect(await screen.findByText("Not found movie")).toBeVisible();
});
