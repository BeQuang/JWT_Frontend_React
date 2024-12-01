import { useContext } from "react";
import "./Nav.scss";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Nav() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
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
  } else return <></>;
}

export default Nav;
