/* eslint-disable no-unused-vars */
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Navigation/Nav";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <Router>
        <div className="app-container">
          <AppRoutes />
          {!user.isAuthenticated ? <Nav /> : <></>}
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
