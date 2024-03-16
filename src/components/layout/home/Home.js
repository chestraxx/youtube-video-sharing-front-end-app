import React, { Component } from "react";
import axios from "axios";

import CardVideo from "../../element/CardVideo";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos() {
    axios
      .get(`${process.env.api}/videos`, { withCredentials: true })
      .then((response) => {
        if (response.data && response.data.videos) {
          this.setState({
            videos: response.data.videos,
          });
        }
      })
      .catch((error) => {
        console.log("fetchVideos error", error);
      });
  }

  render() {
    return (
      <div className="home">
        {this.state.videos.map((video) => (
          <CardVideo key={video.id} video={video} />
        ))}
      </div>
    );
  }
}
