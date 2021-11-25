import React, {useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try{
      
      const response =  await fetch('https://swapi.dev/api/films');

      if (!response.ok){
        throw new Error('Something went wrong!');
      }
      
      const data = await response.json() ;
      const transformedMovies = data.results.map(moviesData => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date
        }
      }) ;
      setMovies(transformedMovies);
      

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);

  },[]);

  useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);



  return (
    <React.Fragment>
      <section>
        <button onClick= {fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
