import "./MovieDB.css";
import { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import MovieCard from "./components/MovieCard";

const MovieDB = () => {
  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const posterSlug = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    setLoading(true);
    handleFetch("popular");
  }, []);

  const clickHandler = () => {
    setLoading(true);
    handleFetch("search");
  };

  const inputTextHandler = (event) => {
    setSearchText(event.target.value);
  };

  // get movie data from endpoint using appropriate URI
  const handleFetch = async (returnType) => {
    let fetchString = "";
    if (returnType === "search") {
      //setLoading(true);
      fetchString = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-UK&query=${searchText}&page=1&include_adult=false`;

      setSearchText("");
    } else {
      //display popular
      fetchString = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    }

    const response = await fetch(fetchString);
    const data = await response.json();

    if (data.results.length === 0) {
      window.alert("Sorry, your search returned no matches");
    } else {
      setMovieData(data);
    }
    setLoading(false);
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
          <h3>
            &copy; Copyright James Davies (jimdavies72){" "}
            {new Date().getFullYear()}
          </h3>
        </footer>
      </>
    );
  }
};

export default MovieDB;
