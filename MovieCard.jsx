import { Link } from "react-router-dom";

function MovieCard({ movie }) {

  return (
    <div className="movie-card">

      {movie.Poster !== "N/A" ? (
        <img
          src={movie.Poster}
          alt={movie.Title}
        />
      ) : (
        <div className="no-image">
          No Image
        </div>
      )}

      <h3>{movie.Title}</h3>

      <p>Year: {movie.Year}</p>

      <Link to={`/movie/${movie.imdbID}`}>
        <button>
          View Details
        </button>
      </Link>

    </div>
  );
}

export default MovieCard;