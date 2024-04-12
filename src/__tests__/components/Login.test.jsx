import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../components/auth/Login";
import axios, { AxiosInstance } from "axios";

describe("Login", () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, {
      api: "http://localhost:3001/api/v1",
    });
  });

  test("test login ui", () => {
    render(<Login />);

    expect(screen.getByText("Login / Register")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login / Register" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  });

  test("test login clickable", () => {
    const onClick = jest.fn();
    render(<Login handleSuccessfulAuth={onClick} />);

    const buttonElement = screen.getByText("Login / Register");
    fireEvent.click(buttonElement);
  });

  test("test login button click - call api success - registed case", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ data: { registed: true, user: {} } }))
      );

    const onClick = jest.fn();
    render(<Login handleSuccessfulAuth={onClick} />);

    const email = screen.getByTestId("email-el");
    fireEvent.change(email, { target: { value: "abc@gmail.com" } });

    const password = screen.getByTestId("password-el");
    fireEvent.change(password, { target: { value: "123456" } });

    const buttonElement = screen.getByText("Login / Register");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.post).toBeCalledWith(
        `http://localhost:3001/api/v1/sessions`,
        {
          user: {
            email: "abc@gmail.com",
            password: "123456",
          },
        },
        { withCredentials: true }
      );

      expect(onClick).toBeCalled();
    });
  });

  test("test login button click - call api success - logged_in case", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(
        jest.fn(() => Promise.resolve({ data: { logged_in: true, user: {} } }))
      );

    const onClick = jest.fn();
    render(<Login handleSuccessfulAuth={onClick} />);

    const email = screen.getByTestId("email-el");
    fireEvent.change(email, { target: { value: "abc@gmail.com" } });

    const password = screen.getByTestId("password-el");
    fireEvent.change(password, { target: { value: "123456" } });

    const buttonElement = screen.getByText("Login / Register");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.post).toBeCalledWith(
        `http://localhost:3001/api/v1/sessions`,
        {
          user: {
            email: "abc@gmail.com",
            password: "123456",
          },
        },
        { withCredentials: true }
      );

      expect(onClick).toBeCalled();
    });
  });

  test("test login button click - call api fail - not register/login case", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(jest.fn(() => Promise.resolve({ data: {} })));

    const onClick = jest.fn();
    render(<Login handleSuccessfulAuth={onClick} />);

    const email = screen.getByTestId("email-el");
    fireEvent.change(email, { target: { value: "abc@gmail.com" } });

    const password = screen.getByTestId("password-el");
    fireEvent.change(password, { target: { value: "123456" } });

    const buttonElement = screen.getByText("Login / Register");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.post).toBeCalledWith(
        `http://localhost:3001/api/v1/sessions`,
        {
          user: {
            email: "abc@gmail.com",
            password: "123456",
          },
        },
        { withCredentials: true }
      );

      expect(onClick).not.toBeCalled();
    });
  });

  test("test login button click - call api fail - params wrong case", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(jest.fn(() => Promise.reject("API error")));

    const onClick = jest.fn();
    render(<Login handleSuccessfulAuth={onClick} />);

    const email = screen.getByTestId("email-el");
    fireEvent.change(email, { target: { value: "abc@gmail.com" } });

    const password = screen.getByTestId("password-el");
    fireEvent.change(password, { target: { value: "123456" } });

    const buttonElement = screen.getByText("Login / Register");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.post).toBeCalledWith(
        `http://localhost:3001/api/v1/sessions`,
        {
          user: {
            email: "abc@gmail.com",
            password: "123456",
          },
        },
        { withCredentials: true }
      );

      expect(onClick).not.toBeCalled();
    });
  });
});
