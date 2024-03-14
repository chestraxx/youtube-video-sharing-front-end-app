import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        alert("Logout successfully!");

        this.props.handleLogout();
      })
      .catch((error) => {
        alert("Logout failed!");

        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div>
        <button className="ml-10px" onClick={() => this.handleLogoutClick()}>
          Share a movie
        </button>

        <button className="ml-10px" onClick={() => this.handleLogoutClick()}>
          Logout
        </button>
      </div>
    );
  }
}
