import "./Nav.scss";
import { NavLink, Outlet } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div className="topnav">
        <NavLink to="/users">Home</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Nav;
