import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-teal-300 px-6 py-4 border-b border-teal-900">
      <div className="max-w-7xl mx-auto flex items-center gap-8">

        {/* Logo */}
        <NavLink to="/" className="font-bold text-3xl mr-auto hover:text-teal-400 transition">
          ⚡ VoltStream
        </NavLink>

        {/* Links */}
        <div className="flex gap-10 text-m">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-1" : "text-white hover:text-teal-300 transition"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-1" : "text-white hover:text-teal-300 transition"
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="/devices"
            className={({ isActive }) =>
              isActive ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-1" : "text-white hover:text-teal-300 transition"
            }
          >
            Devices
          </NavLink>

          <NavLink
            to="/billing"
            className={({ isActive }) =>
              isActive ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-1" : "text-white hover:text-teal-300 transition"
            }
          >
            Billing
          </NavLink>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;