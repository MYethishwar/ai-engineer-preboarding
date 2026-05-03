import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Travel App</h2>

      <nav>
        <NavLink to="/" end className="link">
          Home
        </NavLink>

        <NavLink to="/about" className="link">
          About
        </NavLink>

        <NavLink to="/contact" className="link">
          Contact
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;