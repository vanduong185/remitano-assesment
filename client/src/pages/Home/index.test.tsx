import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./";
import * as api from "../../api/movies";

describe("home-page", () => {
  test("renders home page list movie", async () => {
    jest.spyOn(api, "getListMovies").mockResolvedValue({
      data: [
        {
          id: 1,
          userId: 1,
          movieUrl: "test-url",
          movieDescription: "test-desc",
          movieTitle: "test-title",
          user: {
            username: "test-user",
          },
        },
      ],
    } as any);

    render(<Home />);
    const movieItem = await screen.findByText(/Shared by/i);
    expect(movieItem).toBeVisible();
  });
});
