import { render, screen, waitFor } from "@testing-library/react";
import Home from "../../components/layout/home/Home";

describe("Home", () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, {
      api: "http://localhost:3001/api/v1",
    });
  });

  test("renders users when API call succeeds", async () => {
    const fakeUsers = [
      {
        created_by: "catalog@powersell.com",
        description:
          "The Total War Warhammer 3 Thrones of Decay DLC Trailer has been announced and revealed, and we discuss the trailer, talk about the new units, Warhammer Lore,...",
        embed_code:
          '<iframe src="//www.youtube.com/embed/nmLywKXzJis" frameborder="0" allowfullscreen="allowfullscreen"></iframe>',
        likes_total: null,
        title:
          "THRONES OF DECAY DLC Trailer, Analysis, New Units, Legendary Lords, & Lore - Total War Warhammer 3",
        video_url: "https://www.youtube.com/watch?v=nmLywKXzJis",
        views_total: 11163,
        id: 1,
      },
      {
        created_by: "catalog@powersell.com",
        description:
          "The Total War Warhammer 3 Thrones of Decay DLC Trailer has been announced and revealed, and we discuss the trailer, talk about the new units, Warhammer Lore,...",
        embed_code:
          '<iframe src="//www.youtube.com/embed/nmLywKXzJis" frameborder="0" allowfullscreen="allowfullscreen"></iframe>',
        likes_total: null,
        title:
          "THRONES OF DECAY DLC Trailer, Analysis, New Units, Legendary Lords, & Lore - Total War Warhammer 3",
        video_url: "https://www.youtube.com/watch?v=nmLywKXzJis",
        views_total: 11163,
        id: 2,
      },
    ];
    fetchMock.mockResolvedValue({
      status: 200,
      json: jest.fn(() => {
        return {
          videos: fakeUsers,
        };
      }),
    });

    render(<Home />);

    await waitFor(() => {
      const videos = document.querySelector(".card-video");
      expect(videos).toBeInTheDocument();
    });
  });

  test("renders error when API call fails", async () => {
    fetchMock.mockReject(() => Promise.reject("API error"));

    render(<Home />);

    await waitFor(async () => {
      expect(
        await screen.findByText("Get list shared videos is failed.")
      ).toBeInTheDocument();
    });
  });
});
