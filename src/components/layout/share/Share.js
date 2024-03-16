import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      errors: null,
    };

    this.handleSubmitShare = this.handleSubmitShare.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

  handleSubmitShare(event) {
    event.preventDefault();

    const { url } = this.state;

    axios
      .post(
        `${process.env.api}/video_info`,
        {
          video_url: url,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        NotificationManager.success("Share video successfully!");

        this.setState({
          url: "",
        });
      })
      .catch((error) => {
        NotificationManager.error("Share video failed!");

        console.log("share error", error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="share">
        <div className="share-box">
          <fieldset>
            <legend>
              <h2 className="title">Share a Youtube movie</h2>
            </legend>

            <form className="form" onSubmit={this.handleSubmitShare}>
              <div className="d-flex">
                <div>
                  <strong>Youtube URL:</strong>
                </div>
                <div>
                  <input
                    type="text"
                    name="url"
                    placeholder=""
                    className="ml-10px"
                    value={this.state.url}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex pt-20px">
                <div>
                  <button type="submit" className="ml-10px">
                    Share
                  </button>
                </div>
              </div>
            </form>
          </fieldset>
        </div>
      </div>
    );
  }
}
