# youtube-video-sharing-front-end-app

### Introduction:

    youtube-video-sharing-front-end-app is front-end app, part of youtube sharing app.

### Prerequisites:

    nodejs >= 16.*
    npm >= 8.*

### Installation & Configuration:

    1. git clone https://github.com/chestraxx/youtube-video-sharing-front-end-app.git
    2. cd youtube-video-sharing-front-end-app
    3. npm install
    4. Add config below to env.js:
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

### Database Setup

### Running the Application:

    To start project, run:
    npm run start

### Docker Deployment

### Usage:

    To test application, must start back-end app at the same time.
    Beware to turn off adv block app like AdGuard, AdBlock; may cause page error.

### Troubleshooting:

    In case can not start "npm run start".
    Please try "NODE_OPTIONS=--openssl-legacy-provider npm run start" insteads of.
