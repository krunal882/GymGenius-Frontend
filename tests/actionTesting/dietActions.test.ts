import { actions } from "../../src/Infostore/modules/dietPlanModule"; // Adjust import path as per your project
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification";

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("dietPlan actions", () => {
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

  it("fetchDietPlan commits data correctly when no filters or ID provided", async () => {
    const mockData = [{ _id: "1", name: "Diet 1" }];
    mockAxios
      .onGet("http://localhost:3000/diet-plans?page=1&limit=10")
      .reply(200, mockData);

    const mockCommit = jest.fn();
    await actions.fetchDietPlan(
      { commit: mockCommit },
      { page: 1, limit: 10, id: "" }
    );

    expect(mockCommit).toHaveBeenCalledWith("setDietPlan", mockData);
  });

  it("fetchDietPlan commits data correctly when filteredFilters provided", async () => {
    const mockData = [{ _id: "1", name: "Diet 1" }];
    const filteredFilters = { name: "Diet 1" };
    mockAxios
      .onGet(
        "http://localhost:3000/diet-plans/filter?name=Diet%201&page=1&limit=10"
      )
      .reply(200, mockData);

    const mockCommit = jest.fn();
    await actions.fetchDietPlan(
      { commit: mockCommit },
      { filteredFilters, page: 1, limit: 10, id: "" }
    );

    expect(mockCommit).toHaveBeenCalledWith("setDietPlan", mockData);
  });

  it("fetchDietPlan commits data correctly when ID provided", async () => {
    const mockData = { _id: "1", name: "Diet 1" };
    mockAxios
      .onGet("http://localhost:3000/diet-plans/filter?dietId=1")
      .reply(200, mockData);

    const mockCommit = jest.fn();
    await actions.fetchDietPlan(
      { commit: mockCommit },
      { id: "1", page: 1, limit: 10 }
    );

    expect(mockCommit).toHaveBeenCalledWith("setDietDetail", mockData);
  });

  it("addDietPlan makes a POST request and shows success toast", async () => {
    const mockData = {
      _id: "1",
      name: "Diet 1",
      cloudImg: "image.jpg",
      health_benefits: "Healthy",
      nutritions: "Nutrient",
      culinary_uses: "Culinary Uses",
      varieties: "Varieties",
      fun_facts_and_trivia: "Fun Facts",
      recipes_and_serving_ideas: [
        {
          name: "Recipe 1",
          ingredients: "Ingredients",
          instructions: "Instructions",
        },
      ],
    };

    mockAxios
      .onPost("http://localhost:3000/diet-plans/add")
      .reply(201, mockData);
    const mockCommit = jest.fn();

    await actions.addDietPlan({ commit: mockCommit }, { dietPlan: mockData });

    expect(mockToast.success).toHaveBeenCalledWith(
      "New Diet-plan added successfully"
    );
  });

  it("editDietPlan makes a PATCH request and commits editDiet mutation", async () => {
    const mockData = {
      _id: "1",
      name: "Updated Diet",
      cloudImg: "image.jpg",
      health_benefits: "Updated Healthy",
      nutritions: "Updated Nutrient",
      culinary_uses: "Updated Culinary Uses",
      varieties: "Updated Varieties",
      fun_facts_and_trivia: "Updated Fun Facts",
      recipes_and_serving_ideas: [
        {
          name: "Updated Recipe",
          ingredients: "Updated Ingredients",
          instructions: "Updated Instructions",
        },
      ],
    };

    mockAxios
      .onPatch("http://localhost:3000/diet-plans/update?id=1")
      .reply(200, mockData);
    const mockCommit = jest.fn();

    await actions.editDietPlan(
      { commit: mockCommit },
      { id: "1", dietPlan: mockData }
    );

    expect(mockCommit).toHaveBeenCalledWith("editDiet", {
      id: "1",
      dietPlan: mockData,
    });
    expect(mockToast.success).toHaveBeenCalledWith(
      "Diet-plan updated successfully"
    );
  });

  it("removeDiet makes a DELETE request and commits removeDiet mutation", async () => {
    const productId = "1";
    mockAxios
      .onDelete(`http://localhost:3000/diet-plans/delete?id=${productId}`)
      .reply(200);

    const mockCommit = jest.fn();
    await actions.removeDiet({ commit: mockCommit }, { id: productId });

    expect(mockCommit).toHaveBeenCalledWith("removeDiet", productId);
    expect(mockToast.success).toHaveBeenCalledWith(
      "Diet-plan removed successfully"
    );
  });

  it("handles server error gracefully during addDietPlan", async () => {
    const mockData = {
      _id: "1",
      name: "Diet 1",
      cloudImg: "image.jpg",
      health_benefits: "Healthy",
      nutritions: "Nutrient",
      culinary_uses: "Culinary Uses",
      varieties: "Varieties",
      fun_facts_and_trivia: "Fun Facts",
      recipes_and_serving_ideas: [
        {
          name: "Recipe 1",
          ingredients: "Ingredients",
          instructions: "Instructions",
        },
      ],
    };

    const mockCommit = jest.fn();
    mockAxios
      .onPost("http://localhost:3000/diet-plans/add")
      .reply(500, { error: "Server Error" });

    await actions.addDietPlan({ commit: mockCommit }, { dietPlan: mockData });

    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during editDietPlan", async () => {
    const mockData = {
      _id: "1",
      name: "Updated Diet",
      cloudImg: "image.jpg",
      health_benefits: "Updated Healthy",
      nutritions: "Updated Nutrient",
      culinary_uses: "Updated Culinary Uses",
      varieties: "Updated Varieties",
      fun_facts_and_trivia: "Updated Fun Facts",
      recipes_and_serving_ideas: [
        {
          name: "Updated Recipe",
          ingredients: "Updated Ingredients",
          instructions: "Updated Instructions",
        },
      ],
    };

    const mockCommit = jest.fn();
    mockAxios
      .onPatch("http://localhost:3000/diet-plans/update?id=1")
      .reply(500, { error: "Server Error" });

    await actions.editDietPlan(
      { commit: mockCommit },
      { id: "1", dietPlan: mockData }
    );

    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during removeDiet", async () => {
    const productId = "1";
    const mockCommit = jest.fn();
    mockAxios
      .onDelete(`http://localhost:3000/diet-plans/delete?id=${productId}`)
      .reply(500, { error: "Server Error" });

    await actions.removeDiet({ commit: mockCommit }, { id: productId });

    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });
});
