import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

function Home() {

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const searchMovies = async (movieName) => {

  if (movieName === "") {
    setError("Please enter a movie name");
    return;
  }

  setLoading(true);
  setError("");

  try {

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}&type=movie`
    );

    const data = await response.json();

    console.log(data);

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
      setError(data.Error);
    }

  } catch (error) {

    setMovies([]);
    setError("Unable to connect to OMDb API");

  }

  setLoading(false);
};

  useEffect(() => {
    setSearch("Avengers");
    searchMovies("Avengers");
  }, []);

  const categories = [
    "Avengers",
    "Batman",
    "Harry Potter",
    "Titanic"
  ];

  return (
    <div className="home">

      <div className="heading">

        <h1>Movie Explorer 🎬</h1>

        <p>
          Search and explore your favourite movies
        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
          searchMovies={() => searchMovies(search)}
        />

      </div>

      <div className="container">

        <h2>Categories</h2>

        <div className="categories">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => {
                setSearch(category);
                searchMovies(category);
              }}
            >
              {category}
            </button>

          ))}

        </div>

        {loading && <Loading />}

        {error && (
          <p className="error">
            ❌ {error}
          </p>
        )}

        {!loading && !error && (

          <div className="movie-list">

            {movies.map((movie) => (

              <MovieCard
                key={movie.imdbID}
                movie={movie}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Home;