import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav>

      <Link to="/" className="logo">
        🎬 Movie Explorer
      </Link>

      <Link to="/">
        Home
      </Link>

    </nav>
  );
}

export default Navbar;