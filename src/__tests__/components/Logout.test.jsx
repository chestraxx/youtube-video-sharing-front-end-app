import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Logout from "../../components/auth/Logout";
import axios, { AxiosInstance } from "axios";

describe("Logout", () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, {
      api: "http://localhost:3001/api/v1",
    });
  });

  test("test logout ui", () => {
    render(<Logout />);

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  test("test logout button clickable", async () => {
    const onClick = jest.fn();
    render(<Logout handleLogout={onClick} />);

    const buttonElement = screen.getByText("Logout");
    fireEvent.click(buttonElement);
  });

  test("test logout button click - call api delete success", async () => {
    jest
      .spyOn(axios, "delete")
      .mockImplementation(jest.fn(() => Promise.resolve({})));

    const onClick = jest.fn();
    render(<Logout handleLogout={onClick} />);

    const buttonElement = screen.getByText("Logout");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.delete).toBeCalledWith(
        `http://localhost:3001/api/v1/logout`,
        { withCredentials: true }
      );

      expect(onClick).toBeCalled();
    });
  });

  test("test logout button click - call api delete fail", async () => {
    jest
      .spyOn(axios, "delete")
      .mockImplementation(jest.fn(() => Promise.reject("API error")));

    const onClick = jest.fn();
    render(<Logout handleLogout={onClick} />);

    const buttonElement = screen.getByText("Logout");
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axios.delete).toBeCalledWith(
        `http://localhost:3001/api/v1/logout`,
        {
          withCredentials: true,
        }
      );

      expect(onClick).not.toBeCalled();
    });
  });
});
