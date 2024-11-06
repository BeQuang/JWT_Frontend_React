/* eslint-disable no-unused-vars */
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Nav from "./components/Navigation/Nav";
import Users from "./components/ManageUsers/Users";
import Register from "./components/Register/Register";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route path="/" element={<Nav />}>
              <Route path="users" element={<Users />} />
              <Route path="news" />
              <Route path="about" />
              <Route path="contact" />
            </Route>

            <Route path="*">404 not Found</Route>
          </Routes>
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
