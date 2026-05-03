import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
      <span className="font-bold text-lg mr-auto">✈ Travel Journal</span>

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
        }
      >
        Timeline
      </NavLink>

      <NavLink
        to="/journal"
        className={({ isActive }) =>
          isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
        }
      >
        Add Journal
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