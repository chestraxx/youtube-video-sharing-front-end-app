module.exports = {
  devServer: {
    host: "localhost",
    port: 3000,
    api: "http://localhost:3001/api/v1",
    websocket: "ws://localhost:3001/cable",
  },
  prodServer: {
    api: "https://video-sharing-1ce904f99fbb.herokuapp.com/api/v1",
    websocket: "wss://video-sharing-1ce904f99fbb.herokuapp.com/cable",
  },
};
