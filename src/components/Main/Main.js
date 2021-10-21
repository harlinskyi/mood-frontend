import "./Main.css";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import LeftSide from "./Profile/LeftSide/LeftSide";
import RightSide from "./Profile/RightSide/RightSide";
import LoginPage from "./LoginPage/LoginPage";
import Register from "./Register/Register";
import Settings from "./Settings/Settings";
import Peoples from "./Peoples/Peoples.js";
import { connect } from "react-redux";
import Home from "./Home/Home";
import getUserIdFromUrl from "../../utils/getUserIdFromUrl";

class Main extends Component {
  state = {};

  render() {
    const { isAuth, userId } = this.props;
    return (
      <main className="container-lg">
        {isAuth ? (
          <div className="row logged-in">
            <Route path={`/profile/:id`} component={LeftSide}></Route>
            <Route path={'/profile/:id'} component={RightSide}></Route>
            <Route path={`/settings/${userId}`}>
              <Settings />
            </Route>
            <Route path="/peoples">
              <Peoples />
            </Route>
          </div>
        ) : (
          <div className="row-auto guest">
            <Route path={["/", "/login"]}>
              <LoginPage />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </div>
        )}
      </main>
    );
  }
}

function mapState(stateRedux) {
  return {
    isAuth: stateRedux.auth.isAuth,
    userId: stateRedux.auth.userId,
  };
}

export default connect(mapState)(Main);
