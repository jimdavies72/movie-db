import "./MovieDB.css";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import MovieCard from "./components/MovieCard";

const MovieDB = () => {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);

  const posterSlug = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    handleFetch();
  }, []);

  // get movie data from endpoint
  const handleFetch = async () => {
    const fetchString = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

    const response = await fetch(fetchString);
    //console.log(response);

    const data = await response.json();
    //console.log(data);
    setMovieData(data);
    setLoading(!loading);
  };

  if (loading) {
    // react spinner
    return (
      <div className="spinner">
        <FadeLoader loading={true} color={"#0c9726"} />
        <h3>Loading...</h3>
      </div>
    );
  } else {
    // render the data
    return (
      <>
        <nav>
          <h1>Movie Database</h1>
        </nav>
        <div className="container">
          {movieData.results &&
            movieData.results.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  adult={movie.adult}
                  movieTitle={movie.original_title}
                  language={movie.original_language}
                  overview={movie.overview}
                  popularity={movie.popularity}
                  backdropSrc={`${posterSlug}${movie.backdrop_path}`}
                  posterSrc={`${posterSlug}${movie.poster_path}`}
                  voteScore={movie.vote_average}
                  voteCount={movie.vote_count}
                />
              );
            })}
        </div>
        <footer>
          <h3>&copy; Copyright jimdavies72 2021</h3>
        </footer>
      </>
    );
  }
};

export default MovieDB;
