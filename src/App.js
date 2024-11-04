import "./App.scss";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/news">news</Route>
          <Route path="/about">about</Route>
          <Route path="/contact">contact</Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">404 not Found</Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
