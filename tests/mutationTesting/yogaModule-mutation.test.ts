import { mutations } from "../../src/Infostore/modules/yogaModule";
import { Yoga } from "../../src/Infostore/modules/yogaModule";

describe("Yoga Module Mutations", () => {
  let state;
  const initialYoga: Yoga[] = [
    {
      _id: "1",
      category_name: "Category1",
      english_name: "EnglishName1",
      sanskrit_name_adapted: "SanskritAdapted1",
      sanskrit_name: "Sanskrit1",
      translation_name: "Translation1",
      pose_description: "Description1",
      pose_benefits: "Benefits1",
      instructions: "Instructions1",
      url_png: "URL1",
    },
    {
      _id: "2",
      category_name: "Category2",
      english_name: "EnglishName2",
      sanskrit_name_adapted: "SanskritAdapted2",
      sanskrit_name: "Sanskrit2",
      translation_name: "Translation2",
      pose_description: "Description2",
      pose_benefits: "Benefits2",
      instructions: "Instructions2",
      url_png: "URL2",
    },
  ];

  const newYoga: Yoga[] = [
    {
      _id: "3",
      category_name: "Category2",
      english_name: "EnglishName2",
      sanskrit_name_adapted: "SanskritAdapted2",
      sanskrit_name: "Sanskrit2",
      translation_name: "Translation2",
      pose_description: "Description2",
      pose_benefits: "Benefits2",
      instructions: "Instructions2",
      url_png: "URL2",
    },
  ];
  beforeEach(() => {
    state = {
      yoga: [...initialYoga],
      yogaSearch: [],
      yogaDetail: null,
    };
  });

  it("removeYoga mutation removes the yoga pose from state.yogaSearch", () => {
    const idToRemove = "1";

    mutations.removeYoga(state, idToRemove);

    // Check if the yoga pose with _id '1' is removed from state.yogaSearch
    expect(
      state.yogaSearch.some((yoga) => yoga._id === idToRemove)
    ).toBeFalsy();
  });

  it("removeYoga mutation does not affect state.yoga if the removed yoga is not in yogaSearch", () => {
    const idToRemove = "3";

    mutations.removeYoga(state, idToRemove);

    // Check if state.yoga remains unaffected since '3' was not in yogaSearch
    expect(state.yoga.length).toBe(initialYoga.length);
  });

  it("setYoga mutation sets the state.yoga correctly", () => {
    mutations.setYoga(state, newYoga);

    // Check if state.yoga is set correctly to the new yoga array
    expect(state.yoga).toEqual(newYoga);
  });

  it("setYoga mutation does not affect other state properties", () => {
    mutations.setYoga(state, newYoga);

    // Check if state.yogaSearch and state.yogaDetail remain unaffected
    expect(state.yogaSearch).toEqual([]);
    expect(state.yogaDetail).toBeNull();
  });

  it("appendYoga mutation appends yoga array to state.yoga", () => {
    mutations.appendYoga(state, newYoga);

    // Check if state.yoga now contains all initial and new yoga items
    const expectedYoga = [...initialYoga, ...newYoga];
    expect(state.yoga).toEqual(expectedYoga);
  });

  it("appendYoga mutation does not affect other state properties", () => {
    mutations.appendYoga(state, newYoga);

    // Check if state.yogaSearch and state.yogaDetail remain unaffected
    expect(state.yogaSearch).toEqual([]);
    expect(state.yogaDetail).toBeNull();
  });
});
