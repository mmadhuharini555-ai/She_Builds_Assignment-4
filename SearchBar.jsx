function SearchBar({ search, setSearch, searchMovies }) {

  return (
    <div className="search">

      <input
        type="text"
        placeholder="Enter movie name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchMovies();
          }
        }}
      />

      <button onClick={searchMovies}>
        Search
      </button>

    </div>
  );
}

export default SearchBar;