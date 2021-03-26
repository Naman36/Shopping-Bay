import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import "antd/dist/antd.css";
const App = () => {
  return (
    <Header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Header>
  );
};

export default App;
