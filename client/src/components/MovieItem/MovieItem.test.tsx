import React from "react";
import { render } from "@testing-library/react";
import MovieItem from ".";

it("Should match snapshot", async () => {
  const { container } = render(
    <MovieItem
      movie={{
        id: 1,
        movieDescription: "description",
        movieTitle: "title",
        movieUrl: "https://www.youtube.com/watch?v=B8p1NB9eYcM",
        user: { username: "username" },
        userId: 1,
      }}
    />
  );
  expect(container).toMatchSnapshot();
});
