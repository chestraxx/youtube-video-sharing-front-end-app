import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete(`${process.env.api}/logout`, { withCredentials: true })
      .then((response) => {
        NotificationManager.success("Logout successfully!");

        this.props.handleLogout();
      })
      .catch((error) => {
        NotificationManager.error("Logout failed!");

        console.log("logout error", error);
      });
  }

  render() {
    return (
      <button className="ml-10px" onClick={() => this.handleLogoutClick()}>
        Logout
      </button>
    );
  }
}
