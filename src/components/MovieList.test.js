import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MovieList from "./MovieList";
import axios from "axios";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with Movies", () => {
  act(() => {
    render(<MovieList />, container);
  });
  expect(container.textContent).toBe("Movies");
});

it("renders Movie data", async () => {
  const fakeMovies = {
    data: [
    {
      name: "Harry Potter",
      language: "English",
      rating: "PG",
    }
  ]};
  jest.spyOn(axios, "get").mockImplementation(() =>
    Promise.resolve(fakeMovies)
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<MovieList />, container);
  });

  expect(container.querySelector('[data-testid="name"]').textContent).toBe(fakeMovies.data[0].name);
  expect(container.querySelector('[data-testid="language"]').textContent).toBe(fakeMovies.data[0].language);
  expect(container.textContent).toContain(fakeMovies.data[0].rating);

  // remove the mock to ensure tests are completely isolated
  axios.get.mockRestore();
});
