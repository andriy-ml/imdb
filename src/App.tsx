import React, { useState, useCallback } from 'react';
import './App.css';
import Films from './components/Films';
import {Box, CircularProgress} from "@material-ui/core";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const search = useCallback((e) => {
    const movieTitle: string = e.target.value;
    setTitle(movieTitle);
    setLoading(true);

    fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=21fe4ce5`)
      .then(res => res.json())
      .then((response) => {
        !!response.Response ? setMovies(response.Search) : setMovies([]);
      })
      .catch(() => {
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  return (
    <div className="App">
      <Box component="div" m={1}>
        <form noValidate autoComplete="off">
          <label>Search: </label>
          <input onChange={search} value={title} placeholder="Movie Title" autoFocus/>
        </form>
      </Box>
      {isLoading
        ? <CircularProgress />
        : <Box component="div" m={1} className="Cards-Container">
            <Films movies={movies}/>
          </Box>
      }
      { (!movies || movies && movies.length === 0) && !isLoading && !!title && "No results" }
    </div>
  );
}

export default App;
