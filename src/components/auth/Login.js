import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    };

    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmitLogin(event) {
    event.preventDefault();

    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email,
            password,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.logged_in) {
          alert("Login successfully!");

          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        alert("Login failed!");

        console.log("login error", error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="ml-10px"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="ml-10px"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit" className="ml-10px">
            Login
          </button>
        </form>
      </div>
    );
  }
}
