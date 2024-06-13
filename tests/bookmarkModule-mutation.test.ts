import { mutations } from "../src/Infostore/modules/bookmarkModule";

describe("Bookmark Module Mutations", () => {
  let state;

  beforeEach(() => {
    state = {
      exercise: [],
      nutrition: [],
      yoga: [],
      diet: [],
    };
  });

  it("setBookmarked mutation sets the state correctly", () => {
    const payload = {
      category: "exercise",
      data: [
        { _id: "1", name: "Exercise 1" },
        { _id: "2", name: "Exercise 2" },
      ],
    };

    mutations.setBookmarked(state, payload);
    expect(state.exercise).toEqual(payload.data);
  });

  it("bookmarkItem mutation adds an item to the correct category in state", () => {
    const payload = {
      itemType: "exercise",
      item: { _id: "1", name: "Exercise 1" },
    };

    mutations.bookmarkItem(state, payload);
    expect(state.exercise).toContainEqual(payload.item);
  });

  it("undoBookmark mutation removes an item from the correct category in state", () => {
    // First, add an item to the state to test removal
    state.exercise = [
      { _id: "1", name: "Exercise 1" },
      { _id: "2", name: "Exercise 2" },
    ];

    const payload = {
      itemType: "exercise",
      itemId: "1",
    };

    mutations.undoBookmark(state, payload);
    expect(state.exercise).not.toContainEqual({ _id: "1", name: "Exercise 1" });
    expect(state.exercise).toContainEqual({ _id: "2", name: "Exercise 2" });
  });
});
