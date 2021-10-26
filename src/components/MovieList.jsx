import { useState, useEffect } from "react";
import axios from "axios";

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    axios.get("/")
    .then(res => {
      setMovieList(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1>Movies</h1>
      {Array.isArray(movieList) &&
        movieList.map((movie, index) => {
          return (
            <div key={index}>
              <h3 data-testid="name">{movie.name}</h3>
              <p data-testid="language">{movie.language}</p>
              <p>{movie.rating}</p>
            </div>
          );
        })}
    </>
  );
}
