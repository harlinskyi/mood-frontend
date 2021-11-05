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
import PageNotFound from "../common/PageNotFound/PageNotFound";
import AdminPanel from "./AdminPanel/AdminPanel";

class Main extends Component {
  state = {};

  render() {
    const { isAuth } = this.props;
    return (
      <main className="container-lg">
        {isAuth ? (
          <div className="row logged-in">
            <Route exact path={'/profile/:id'} component={(props) => <LeftSide {...props} key={window.location.pathname} />}></Route>
            <Route exact path={'/profile/:id'} component={(props) => <RightSide {...props} key={window.location.pathname} />}></Route>
            <Route path={`/settings`} component={Settings}></Route>
            <Route exact path="/peoples" component={Peoples}></Route>
            <Route exact path={[`/admin-panel`, `/admin-panel/*`]} component={AdminPanel}></Route>
          </div>
        ) : (
          <div className="row-auto guest">
            <Route exact path={["/", "/login"]} component={LoginPage}></Route>
            <Route exact path="/register" component={Register}></Route>
          </div>
        )}
          <Route path="/404" component={PageNotFound}></Route>
      </main>
    );
  }
}

function mapState(stateRedux) {
  return {
    isAuth: stateRedux.auth.isAuth,
    userId: stateRedux.auth.userId
  };
}

export default connect(mapState)(Main);
