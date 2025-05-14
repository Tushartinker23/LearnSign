import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "./components/NavBar";
import { NAV_ITEMS } from "./constants/navigation.js";
import AllClasses from "./pages/AllClasses";
import Baseline from "./pages/Baseline";
import WordGame from "./pages/WordGame";
import LoginPage from "./components/LoginPage.js";
import TopTenScore from "./components/TopTenScore.js";
import Logout from "./pages/Logout.js";
import WordList from "./pages/WordList.js";

// Updated PrivateRoute to check localStorage
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("userId");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  const user = useSelector((state) => state.auth.user);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId"));

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(!!localStorage.getItem("userId"));
    }
  }, [user]);

  return (
    <Router>
      {isAuthenticated && <NavBar />}
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={Logout} />
        <PrivateRoute exact path={NAV_ITEMS.FOUR_CLASSES.to} component={Baseline} />
        <PrivateRoute exact path={NAV_ITEMS.ALL_CLASSES.to} component={AllClasses} />
        <PrivateRoute exact path={NAV_ITEMS.WORD_GAME.to} component={WordGame} />
        <PrivateRoute exact path={NAV_ITEMS.GAME_SCORE.to} component={TopTenScore} />
        <PrivateRoute exact path={NAV_ITEMS.WORD_LIST.to} component={WordList} />
        <Redirect to={isAuthenticated ? NAV_ITEMS.WORD_GAME.to : "/login"} />
      </Switch>
    </Router>
  );
}

export default App;
