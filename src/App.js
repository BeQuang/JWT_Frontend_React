import "./App.scss";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Switch>
          <Route path="/news">news</Route>
          <Route path="/about">about</Route>
          <Route path="/contact">contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">404 not Found</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
