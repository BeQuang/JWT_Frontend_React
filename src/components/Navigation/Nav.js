import "./Nav.scss";
import { NavLink, Outlet } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div className="topnav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default Nav;
