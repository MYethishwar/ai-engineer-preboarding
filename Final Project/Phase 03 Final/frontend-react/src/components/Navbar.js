// Navbar.js
// shows navigation links at the top of every page
// NavLink is like <a> tag but for React Router
// it knows which page is active and highlights it

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    // nav bar container — dark background full width
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">

      {/* app title */}
      <span className="font-bold text-lg mr-auto">✈ Travel Journal</span>

      {/* NavLink = React Router's smart link */}
      {/* it adds "active" styling when on that page */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
        }
      >
        Timeline
      </NavLink>

      <NavLink
        to="/add"
        className={({ isActive }) =>
          isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
        }
      >
        Add Trip
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
        }
      >
        Wishlist
      </NavLink>

    </nav>
  );
}

export default Navbar;