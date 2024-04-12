import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import axios, { AxiosInstance } from "axios";
import * as CONST from "../../constant/constant";
import TopNav from "../../components/layout/TopNav";
import Login from "../../components/auth/Login";

describe("TopNav", () => {
  test("test topnav ui", () => {
    render(<TopNav />);

    expect(screen.getByText("FUNNY MOVIES")).toBeInTheDocument();
  });

  test("test topnav logged in", () => {
    render(
      <TopNav
        loggedInStatus={CONST.LOGGED_IN}
        user={{ email: "abc@gmail.com" }}
      />
    );

    expect(screen.getByText("Welcome abc@gmail.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Share a movie" })
    ).toBeInTheDocument();

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  test("test topnav logged in with user error", () => {
    render(<TopNav loggedInStatus={CONST.LOGGED_IN} user={{}} />);

    expect(screen.getByText("Welcome User")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Share a movie" })
    ).toBeInTheDocument();

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  test("test topnav not logged in", () => {
    render(<TopNav loggedInStatus={CONST.NOT_LOGGED_IN} />);

    expect(screen.getByText("Login / Register")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login / Register" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  });

  test("test topnav handleHomeClick", () => {
    const history = createMemoryHistory();

    render(<TopNav history={history} />);

    const homeIcon = screen.getByTestId("home-icon-el");
    fireEvent.click(homeIcon);

    expect(history.location.pathname).toBe("/");
  });

  test("test topnav handleShareClick", () => {
    const history = createMemoryHistory();

    render(
      <TopNav
        history={history}
        loggedInStatus={CONST.LOGGED_IN}
        user={{ email: "abc@gmail.com" }}
      />
    );

    const homeIcon = screen.getByText("Share a movie");
    fireEvent.click(homeIcon);

    expect(history.location.pathname).toBe("/share");
  });

  test("test topnav handleSuccessfulAuth", async () => {
    const history = createMemoryHistory();
    const handleLogin = jest.fn();

    render(
      <TopNav
        history={history}
        loggedInStatus={CONST.NOT_LOGGED_IN}
        handleLogin={handleLogin}
      />
    );

    jest
      .spyOn(axios, "post")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ data: { logged_in: true, user: {} } }))
      );

    const email = screen.getByTestId("email-el");
    fireEvent.change(email, { target: { value: "abc@gmail.com" } });

    const password = screen.getByTestId("password-el");
    fireEvent.change(password, { target: { value: "123456" } });

    const buttonElement = screen.getByText("Login / Register");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
      expect(handleLogin).toBeCalled();
    });
  });
});
