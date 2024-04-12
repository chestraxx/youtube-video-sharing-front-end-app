import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import axios, { AxiosInstance } from "axios";
import Share from "../../components/layout/share/Share";
import * as CONST from "../../constant/constant";

describe("Share", () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, {
      api: "http://localhost:3001/api/v1",
    });
  });

  test("test ui", () => {
    const history = createMemoryHistory();

    render(<Share />);

    expect(screen.getByText("Share a Youtube movie")).toBeInTheDocument();
    expect(screen.getByText("Youtube URL:")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "url" })).toBeInTheDocument();

    const shareButton = screen.queryByText("Share");
    expect(shareButton).not.toBeInTheDocument();

    expect(history.location.pathname).toBe("/");
  });

  test("test ui logged in", () => {
    render(<Share loggedInStatus={CONST.LOGGED_IN} />);

    const url = screen.getByRole("textbox", { name: "url" });
    fireEvent.change(url, { target: { value: "123456" } });
    expect(screen.getByDisplayValue("123456")).toBeInTheDocument();

    expect(screen.getByText("Share a Youtube movie")).toBeInTheDocument();
    expect(screen.getByText("Youtube URL:")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "url" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
  });

  test("test share button clickable", () => {
    render(<Share loggedInStatus={CONST.LOGGED_IN} />);

    const shareButton = screen.getByRole("button", { name: "Share" });
    fireEvent.click(shareButton);
  });

  test("test share button click - call api success", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(jest.fn(() => Promise.resolve({ data: {} })));

    render(<Share loggedInStatus={CONST.LOGGED_IN} />);

    const url = screen.getByRole("textbox", { name: "url" });
    fireEvent.change(url, { target: { value: "123456" } });

    const shareButton = screen.getByRole("button", { name: "Share" });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(axios.post).toBeCalledWith(
        `http://localhost:3001/api/v1/video_info`,
        { video_url: "123456" },
        { withCredentials: true }
      );
    });
  });

  test("test share button click - call api fail", async () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(jest.fn(() => Promise.reject("API failed")));

    render(<Share loggedInStatus={CONST.LOGGED_IN} />);

    const url = screen.getByRole("textbox", { name: "url" });
    fireEvent.change(url, { target: { value: "123456" } });

    const shareButton = screen.getByRole("button", { name: "Share" });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(axios.post).toBeCalledWith(
        `http://localhost:3001/api/v1/video_info`,
        { video_url: "123456" },
        { withCredentials: true }
      );
    });
  });
});
