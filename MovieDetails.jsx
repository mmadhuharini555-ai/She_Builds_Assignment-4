import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";

function MovieDetails() {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {

    const getMovie = async () => {

      try {

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );

        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError("Movie details not found");
        }

      } catch (error) {
        setError("Something went wrong");
      }

      setLoading(false);
    };

    getMovie();

  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="details">

      <Link to="/">
        ← Back to Home
      </Link>

      <div className="details-box">

        <img
          src={movie.Poster}
          alt={movie.Title}
        />

        <div>

          <h1>{movie.Title}</h1>

          <p>
            <b>Year:</b> {movie.Year}
          </p>

          <p>
            <b>Genre:</b> {movie.Genre}
          </p>

          <p>
            <b>Director:</b> {movie.Director}
          </p>

          <p>
            <b>Actors:</b> {movie.Actors}
          </p>

          <p className="rating">
             IMDb Rating: {movie.imdbRating}
          </p>

          <h3>Plot</h3>

          <p>
            {movie.Plot}
          </p>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;