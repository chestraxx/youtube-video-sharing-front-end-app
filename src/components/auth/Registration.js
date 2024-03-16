import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      registrationErrors: "",
    };

    this.handleSubmitRegis = this.handleSubmitRegis.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmitRegis(event) {
    event.preventDefault();

    const { email, password } = this.state;

    axios
      .post(
        `${process.env.api}/registration`,
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
        if (response.data.status === "created") {
          NotificationManager.success("Register successfully!");

          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        NotificationManager.error("Register failed!");

        console.log("registration error", error);
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
        <form onSubmit={this.handleSubmitRegis}>
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
            Register
          </button>
        </form>
      </div>
    );
  }
}
