import { render, screen } from "@testing-library/react";
import CardVideo from "../../components/element/CardVideo";

const mockData = {
  created_by: "abc@gmail.com",
  description: "PaganiZonda",
  embed_code:
    '<iframe src="//www.youtube.com/embed/rjWZ-G2_LMg" frameborder="0" allowfullscreen="allowfullscreen"></iframe>',
  title: "NAMLEE - PAGANI ZONDA feat. VOVANDUCKHUNG (Official Musik Video)",
  video_url:
    "https://www.youtube.com/watch?v=rjWZ-G2_LMg&list=RD4AlGGEYOlws&index=4",
  likes_total: 1556,
  views_total: 105087,
};

const mockDataWithoutLikeAndView = {
  created_by: "abc@gmail.com",
  description: "PaganiZonda",
  embed_code:
    '<iframe src="//www.youtube.com/embed/rjWZ-G2_LMg" frameborder="0" allowfullscreen="allowfullscreen"></iframe>',
  title: "NAMLEE - PAGANI ZONDA feat. VOVANDUCKHUNG (Official Musik Video)",
  video_url:
    "https://www.youtube.com/watch?v=rjWZ-G2_LMg&list=RD4AlGGEYOlws&index=4",
  // likes_total: 1556,
  // views_total: 105087,
};

describe("CardVideo", () => {
  test("test CardVideo render data", () => {
    render(<CardVideo video={mockData} />);

    const created_by = screen.getByText(/abc@gmail.com/i);
    expect(created_by).toBeInTheDocument();

    const description = screen.getByText(/PaganiZonda/i);
    expect(description).toBeInTheDocument();

    const embed_code = screen.getByRole("iframe", {
      src: "//www.youtube.com/embed/rjWZ-G2_LMg",
    });
    expect(embed_code).toBeInTheDocument();

    const likes_total = screen.getByText(/1556/i);
    expect(likes_total).toBeInTheDocument();

    const views_total = screen.getByText(/105087/i);
    expect(views_total).toBeInTheDocument();

    const title = screen.getByText(
      "NAMLEE - PAGANI ZONDA feat. VOVANDUCKHUNG (Official Musik Video)"
    );
    expect(title).toBeInTheDocument();

    const video_url = screen.getByRole("link", {
      name: "NAMLEE - PAGANI ZONDA feat. VOVANDUCKHUNG (Official Musik Video)",
    });
    expect(video_url).toBeInTheDocument();
    expect(video_url).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=rjWZ-G2_LMg&list=RD4AlGGEYOlws&index=4"
    );
    expect(video_url).toHaveAttribute("target", "_blank");
  });

  test("test CardVideo render data without like and view", () => {
    render(<CardVideo video={mockDataWithoutLikeAndView} />);

    const likes_total = screen.getAllByText(/0/i);
    expect(likes_total).toHaveLength(2);
  });
});
