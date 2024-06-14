import { actions, State, Yoga } from "../../src/Infostore/modules/yogaModule";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification";

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("yogaModule actions", () => {
  let mockAxios: MockAdapter;
  let mockToast: any;
  const state: State = {
    yoga: [],
    yogaSearch: [],
    yogaDetail: null,
  };

  const mockYogaPose: Yoga = {
    _id: "6603b05810e52067a82c40dc",
    category_name: "Category",
    english_name: "English Name",
    sanskrit_name_adapted: "Sanskrit Name Adapted",
    sanskrit_name: "Sanskrit Name",
    translation_name: "Translation Name",
    pose_description: "Description",
    pose_benefits: "Benefits",
    instructions: "Instructions",
    url_png: "url.png",
  };

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

  it("fetchYoga commits data correctly", async () => {
    const commit = jest.fn();
    const mockResponse = [mockYogaPose];

    mockAxios
      .onGet("http://localhost:3000/yoga-poses?page=1&limit=10")
      .reply(200, mockResponse);

    await actions.fetchYoga(
      { commit },
      { filteredFilters: {}, page: 1, limit: 10, id: "" }
    );

    expect(commit).toHaveBeenCalledWith("setYoga", mockResponse);
  });

  it("searchYoga commits search data correctly", async () => {
    const commit = jest.fn();
    const name = "Yoga Pose";
    const mockResponse = [mockYogaPose];

    mockAxios
      .onGet(`http://localhost:3000/yoga-poses/filtered?name=${name}`)
      .reply(200, mockResponse);

    await actions.searchYoga({ commit }, name);

    expect(commit).toHaveBeenCalledWith("setYogaSearch", mockResponse);
  });

  it("addYoga successfully adds a new yoga pose", async () => {
    const commit = jest.fn();

    mockAxios
      .onPost("http://localhost:3000/yoga-poses/addYoga")
      .reply(201, mockYogaPose);

    await actions.addYoga({ commit }, { yoga: mockYogaPose });

    expect(mockToast.success).toHaveBeenCalledWith(
      "New Yoga-pose added successfully"
    );
  });

  it("editYoga successfully edits an existing yoga pose", async () => {
    const commit = jest.fn();

    mockAxios
      .onPatch(
        `http://localhost:3000/yoga-poses/updateYoga?id=${mockYogaPose._id}`
      )
      .reply(200, mockYogaPose);

    await actions.editYoga({ commit }, { yoga: mockYogaPose });

    expect(commit).toHaveBeenCalledWith("editYoga", mockYogaPose);
    expect(mockToast.success).toHaveBeenCalledWith(
      " Yoga-pose updated successfully"
    );
  });

  it("removeYoga successfully removes a yoga pose", async () => {
    const commit = jest.fn();
    const id = mockYogaPose._id;

    mockAxios
      .onDelete(`http://localhost:3000/yoga-poses/deleteYoga?id=${id}`)
      .reply(200);

    await actions.removeYoga({ commit }, { id });

    expect(commit).toHaveBeenCalledWith("removeYoga", id);
    expect(mockToast.success).toHaveBeenCalledWith(
      " Yoga-pose removed successfully"
    );
  });

  it("handles server error correctly", async () => {
    const commit = jest.fn();
    const errorMessage =
      "An error occurred on the server. Please try again later.";

    mockAxios
      .onPost("http://localhost:3000/yoga-poses/addYoga")
      .reply(500, { message: errorMessage });

    await actions.addYoga({ commit }, { yoga: mockYogaPose });

    expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
  });
});
