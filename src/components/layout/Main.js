import React, { Component } from "react";
import axios from "axios";

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <div>
          <h1>Home</h1>
          <h1>Status: {this.props.user.email} </h1>
        </div>
      </div>
    );
  }
}
