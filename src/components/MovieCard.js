const MovieCard = (props) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${props.backdropSrc})`,
        }}
        className="card-container"
      >
        <h2 id="card-heading">{props.movieTitle}</h2>

        <div className="movie-detail">
          <h3>Movie Rank: {props.key}</h3>
          <div className="overview">
            <img id="poster" src={props.posterSrc} alt={props.movieTitle} />
            <h4>{props.overview}</h4>
          </div>

          <p>Adult film? - {props.adult}</p>
          <p>Language: {props.language}</p>

          <h4>{props.popularity}</h4>
          <h4>
            Score: {props.voteScore}/10 ({props.voteCount} votes counted)
          </h4>
        </div>
      </div>
    </>
  );
};

//<img className="backdrop" src={props.backdropSrc} alt={props.movieTitle} />;

export default MovieCard;
