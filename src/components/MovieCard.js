const MovieCard = (props) => {
  return (
    <>
      <div className="card-container">
        <h2 id="card-heading">{props.movieTitle} </h2>

        <div className="movie-detail">
          <div className="section poster-img">
            <img id="poster" src={props.posterSrc} alt={props.movieTitle} />
          </div>
          <div className="section overview">
            <h3>{props.overview}</h3>
          </div>
          <div className="section film-data">
            <ul>
              <li>Adult film? - {props.adult}</li>
              <li>Language: {props.language}</li>
              <li>Popularity: {props.popularity}</li>
              <li>
                Score: {props.voteScore}/10 ({props.voteCount} votes counted)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
