import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import * as CONST from "../constant/constant";

import TopNav from "./layout/TopNav";
import Home from "./layout/home/Home";
import Share from "./layout/share/Share";
import Page404 from "./layout/error/Page404";

var ws = null;

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(CONST.NOT_LOGGED_IN);
  const [user, setUser] = useState({});

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    initialWS();
  }, [loggedInStatus]);

  const initialWS = async () => {
    if (loggedInStatus === CONST.LOGGED_IN) {
      await connectToWebSocketServer();
    }
  };

  const connectToWebSocketServer = () => {
    ws = new WebSocket(`${process.env.websocket}`);

    setTimeout(() => {
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: user.id,
            channel: `NotificationsChannel`,
          }),
        })
      );

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (
          data.type === "ping" ||
          data.type === "welcome" ||
          data.type === "confirm_subscription" ||
          data.type === "disconnect"
        ) {
          return;
        }

        const { message } = data;
        if (message.video_title && message.created_by) {
          NotificationManager.info(
            `A video was shared by ${message.created_by}`,
            message.video_title,
            5000
          );
        }
      };
    }, 5000);
  };

  const checkLoginStatus = async () => {
    await axios
      .get(`${process.env.api}/logged_in`, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === CONST.NOT_LOGGED_IN) {
          setLoggedInStatus(CONST.LOGGED_IN);
          setUser(response.data.user);
        } else if (
          !response.data.logged_in &&
          loggedInStatus === CONST.LOGGED_IN
        ) {
          setLoggedInStatus(CONST.NOT_LOGGED_IN);
          setUser({});
        }
      })
      .catch((error) => {
        console.log("logged in error", error);
      });
  };

  const handleLogin = (data) => {
    setTimeout(() => {
      initialWS();
    }, 500);

    setLoggedInStatus(CONST.LOGGED_IN);
    setUser(data.user);
  };

  const handleLogout = () => {
    ws.close();

    setLoggedInStatus(CONST.NOT_LOGGED_IN);
    setUser({});

    window.location.href = "/";
  };

  return (
    <div className="app">
      <NotificationContainer />

      <Switch>
        <Route
          exact
          path={"/"}
          render={(props) => (
            <div className="home-page">
              <TopNav
                {...props}
                loggedInStatus={loggedInStatus}
                user={user}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />

              <Home {...props} loggedInStatus={loggedInStatus} user={user} />
            </div>
          )}
        />

        <Route
          path={"/share"}
          render={(props) => (
            <div className="share-page">
              <TopNav
                {...props}
                loggedInStatus={loggedInStatus}
                user={user}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />

              <Share {...props} loggedInStatus={loggedInStatus} user={user} />
            </div>
          )}
        />

        <Route path={"*"} render={() => <Page404 />} />
      </Switch>
    </div>
  );
}

export default App;
