import "./MovieDB.css";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import MovieCard from "./components/MovieCard";

const MovieDB = () => {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [returnType, setReturnType] = useState(0);
  const [searchText, setSearchText] = useState("");

  const posterSlug = "https://image.tmdb.org/t/p/original";

  const apiReturnType = ["popular", "search"];

  useEffect(() => {
    handleFetch();
  }, []);

  const clickHandler = () => {
    setReturnType(1);
    handleFetch();
  };

  const inputTextHandler = (event) => {
    setSearchText(event.target.value);
  };

  // get movie data from endpoint
  const handleFetch = async () => {
    console.log(apiReturnType[returnType]);
    let fetchString = "";
    if (apiReturnType[returnType] === "search") {
      fetchString = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-UK&query=${searchText}&page=1&include_adult=false`;
    } else {
      //display popular
      fetchString = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    }

    const response = await fetch(fetchString);
    //console.log(fetchString);

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
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={inputTextHandler}
            />
            <button onClick={clickHandler}>Search</button>
          </div>
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
