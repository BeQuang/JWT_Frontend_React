import Login from "../components/Login/Login";
import NavHeader from "../components/Navigation/NavHeader";
import Users from "../components/ManageUsers/Users";
import Register from "../components/Register/Register";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <NavHeader />
            </PrivateRoutes>
          }
        >
          <Route path="users" element={<Users />} />
          <Route path="projects" />
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*">404 not Found</Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
