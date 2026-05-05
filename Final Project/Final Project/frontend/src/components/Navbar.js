import { NavLink } from "react-router-dom";
// It tells that after clicking on element on navigation bar what page should trigger

function Navbar() {
  return (
    <nav className="bg-green-900 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-8">
        
        {/* Logo */}
        <span className="font-bold text-lg mr-auto">✈ Travel Journal</span>

        {/* Links */}
        <div className="flex gap-10 ">
          
          <NavLink
            to="/"
            className={({ isActive }) =>  //mouse hover
              isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
            }
          >
            Timeline
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
            }
          >
            Statistics
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              isActive ? "text-teal-400 font-bold" : "text-white hover:text-teal-300"
            }
          >
            Expenses
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

        </div>
      </div>
    </nav>
  );
}

export default Navbar;