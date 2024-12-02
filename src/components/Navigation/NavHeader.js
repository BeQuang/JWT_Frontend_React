import { useContext } from "react";
import "./Nav.scss";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.svg";

function NavHeader() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <div>
        {/* <div className="topnav">
          
        </div> */}
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
                <span className="brand">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                </Nav>

                <Nav>
                  <Nav.Item className="nav-link">Welcome!</Nav.Item>
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Change password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        <Outlet />
      </div>
    );
  } else return <></>;
}

export default NavHeader;
