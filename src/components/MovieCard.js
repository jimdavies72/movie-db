const MovieCard = (props) => {
  return (
    <>
      <div className="card-container">
        <h2 id="card-heading">{props.movieTitle} </h2>

        <div className="movie-detail">
          <div className="overview">
            <img id="poster" src={props.posterSrc} alt={props.movieTitle} />
            <h4>{props.overview}</h4>
          </div>
          <div className="film-data">
            <h4>Rank: {props.key}</h4>
            <h4>Adult film? - {props.adult}</h4>
            <h4>Language: {props.language}</h4>
            <h4>Popularity: {props.popularity}</h4>
            <h4>
              Score: {props.voteScore}/10 ({props.voteCount} votes counted)
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
