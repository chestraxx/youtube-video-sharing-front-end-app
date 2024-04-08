import React, { Component, useEffect } from "react";
import axios from "axios";

import * as CONST from "../../constant/constant";

import Login from "../auth/Login";
import Logout from "../auth/Logout";

export default class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      registrationErrors: "",
    };

    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/");
  }

  handleShareClick() {
    this.props.history.push("/share");
  }

  handleHomeClick() {
    this.props.history.push("/");
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="topnav d-flex align-items-center">
        <div className="d-flex align-items-center">
          <svg
            className="home-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            onClick={() => this.handleHomeClick()}
          >
            <path d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z" />
          </svg>

          <div className="home-title pl-10px">FUNNY MOVIES </div>
        </div>

        <div className="d-flex align-items-center">
          {this.props.loggedInStatus === CONST.NOT_LOGGED_IN && (
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
          )}

          {this.props.loggedInStatus === CONST.LOGGED_IN && (
            <span>Welcome {this.props.user.email || "User"}</span>
          )}

          {this.props.loggedInStatus === CONST.LOGGED_IN && (
            <button className="ml-10px" onClick={() => this.handleShareClick()}>
              Share a movie
            </button>
          )}

          {this.props.loggedInStatus === CONST.LOGGED_IN && (
            <Logout
              handleSuccessfulAuth={this.handleSuccessfulAuth}
              handleLogout={this.props.handleLogout}
            />
          )}
        </div>
      </div>
    );
  }
}
