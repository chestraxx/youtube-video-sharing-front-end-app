import { render, screen } from "@testing-library/react";
import Page404 from "../../components/layout/error/Page404";

describe("Page404", () => {
  test("test page404 title", () => {
    render(<Page404 />);

    const element = screen.getByText(/page not found/i);

    expect(element).toBeInTheDocument();
  });
});
