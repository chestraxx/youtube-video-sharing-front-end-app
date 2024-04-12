import React, { Component } from "react";
import axios from "axios";

import CardVideo from "../../element/CardVideo";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      error: null,
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  async fetchVideos() {
    try {
      const response = await fetch(`${process.env.api}/videos`, {
        withCredentials: true,
      });
      const data = await response.json();

      this.setState({
        videos: data.videos,
      });
    } catch (error) {
      this.setState({
        error: "Get list shared videos is failed.",
      });
    }
  }

  render() {
    return (
      <div className="home">
        {this.state.error && <div>{this.state.error}</div>}

        {this.state.videos.map((video) => (
          <CardVideo key={video.id} video={video} />
        ))}
      </div>
    );
  }
}
