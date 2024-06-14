import { actions } from "../../src/Infostore/modules/bookmarkModule";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification";

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("bookmarkModule actions", () => {
  let mockAxios;
  let mockToast;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };

    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  afterEach(() => {
    mockAxios.restore();
    jest.clearAllMocks();
  });

  it("fetches bookmarked items and commits mutation", async () => {
    const userId = "123";
    const mockResponseData = [
      {
        item: {
          exercise: ["e1", "e2"],
          yoga: ["y1"],
          nutrition: ["n1"],
          diet: ["d1"],
        },
      },
    ];

    const mockCommit = jest.fn();

    // Mock axios GET request for bookmarks
    mockAxios
      .onGet(`http://localhost:3000/bookmark/getBookmarked?userId=${userId}`)
      .reply(200, mockResponseData);

    // Mock axios GET requests for item details
    mockAxios
      .onGet("http://localhost:3000/exercises/filtered?_id=e1&_id=e2")
      .reply(200, [
        { _id: "e1", name: "Exercise 1" },
        { _id: "e2", name: "Exercise 2" },
      ]);

    mockAxios
      .onGet("http://localhost:3000/yoga-poses/filtered?yogaId=y1")
      .reply(200, [{ yogaId: "y1", name: "Yoga Pose 1" }]);

    mockAxios
      .onGet("http://localhost:3000/foodNutrition/filtered?_id=n1")
      .reply(200, [{ _id: "n1", name: "Nutrition 1" }]);

    mockAxios
      .onGet("http://localhost:3000/diet-plans/filter?dietId=d1")
      .reply(200, [{ dietId: "d1", name: "Diet Plan 1" }]);

    // Call the action
    await actions.fetchBookmarked({ commit: mockCommit }, { userId });

    // Assert that the correct mutations were called
    expect(mockCommit).toHaveBeenCalledWith("setBookmarked", {
      category: "exercise",
      data: [
        { _id: "e1", name: "Exercise 1" },
        { _id: "e2", name: "Exercise 2" },
      ],
    });
    expect(mockCommit).toHaveBeenCalledWith("setBookmarked", {
      category: "yoga",
      data: [{ yogaId: "y1", name: "Yoga Pose 1" }],
    });
    expect(mockCommit).toHaveBeenCalledWith("setBookmarked", {
      category: "nutrition",
      data: [{ _id: "n1", name: "Nutrition 1" }],
    });
    expect(mockCommit).toHaveBeenCalledWith("setBookmarked", {
      category: "diet",
      data: [{ dietId: "d1", name: "Diet Plan 1" }],
    });
  });

  it("bookmarks an item and commits mutation", async () => {
    const item = { _id: "i1", name: "Item 1" };
    const userId = "123";
    const itemType = "exercise";

    const mockCommit = jest.fn();

    // Mock axios POST request for bookmarking
    mockAxios
      .onPost("http://localhost:3000/bookmark/addBookmark")
      .reply(201, { message: "Item bookmarked" });

    // Call the action
    await actions.bookmarkItem(
      { commit: mockCommit },
      { item, userId, itemType }
    );

    // Assert that the correct mutation was called
    expect(mockCommit).toHaveBeenCalledWith("bookmarkItem", { itemType, item });
    expect(mockToast.success).toHaveBeenCalledWith(
      "Exercise Bookmarked successfully"
    );
  });

  it("removes a bookmark and commits mutation", async () => {
    const itemId = "i1";
    const userId = "123";
    const itemType = "exercise";

    const mockCommit = jest.fn();

    // Mock axios POST request for undoing bookmark
    mockAxios
      .onPost("http://localhost:3000/bookmark/undoBookmark")
      .reply(201, { message: "Bookmark removed" });

    // Call the action
    await actions.undoBookmark(
      { commit: mockCommit, dispatch: jest.fn() },
      { itemId, userId, itemType }
    );

    // Assert that the correct mutation was called
    expect(mockCommit).toHaveBeenCalledWith("undoBookmark", {
      itemType,
      itemId,
    });
    expect(mockToast.success).toHaveBeenCalledWith(
      "Bookmark removed successfully"
    );
  });

  it("handles server error gracefully during fetchBookmarked", async () => {
    const userId = "123";
    const mockCommit = jest.fn();

    // Mock axios GET request to simulate server error
    mockAxios
      .onGet(`http://localhost:3000/bookmark/getBookmarked?userId=${userId}`)
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.fetchBookmarked({ commit: mockCommit }, { userId });

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "setBookmarked",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during bookmarkItem", async () => {
    const item = { _id: "i1", name: "Item 1" };
    const userId = "123";
    const itemType = "exercise";

    const mockCommit = jest.fn();

    // Mock axios POST request to simulate server error
    mockAxios
      .onPost("http://localhost:3000/bookmark/addBookmark")
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.bookmarkItem(
      { commit: mockCommit },
      { item, userId, itemType }
    );

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "bookmarkItem",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during undoBookmark", async () => {
    const itemId = "i1";
    const userId = "123";
    const itemType = "exercise";

    const mockCommit = jest.fn();

    // Mock axios POST request to simulate server error
    mockAxios
      .onPost("http://localhost:3000/bookmark/undoBookmark")
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.undoBookmark(
      { commit: mockCommit, dispatch: jest.fn() },
      { itemId, userId, itemType }
    );

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "undoBookmark",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });
});
