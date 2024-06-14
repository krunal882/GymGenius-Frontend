import { actions, FoodItem } from "../../src/Infostore/modules/foodItemModule";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification";

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("foodItemModule actions", () => {
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

  it("editFoodItem commits data correctly", async () => {
    const commit = jest.fn();
    const updatedFoodItem: FoodItem = {
      _id: "food_item_id",
      name: "Apple",
      category: "fruits",
      health_benefits: "Rich in fiber",
      nutritions: {
        calories: 60,
        protein: 1,
        fat: 0.5,
        carbohydrates: 15,
        fiber: 3,
        magnesium: 12,
        phosphorus: 25,
        vitamin_B6: 0.2,
        cloudImg: "apple.jpg",
      },
      culinary_uses: "Snacks, Salads",
      varieties: "Red Delicious, Granny Smith",
      fun_facts_and_trivia: "Apples float in water",
      recipes_and_serving_ideas: [
        {
          name: "Apple Pie",
          ingredients: "Apples, Flour, Sugar",
          instructions: "Bake apples with flour and sugar. Serve hot.",
        },
      ],
    };

    // Mock axios PATCH request for updating an existing food item
    mockAxios
      .onPatch(
        `http://localhost:3000/foodNutrition/updateFoodItem?id=${updatedFoodItem._id}`
      )
      .reply(200, updatedFoodItem);

    // Call the action
    await actions.editFoodItem({ commit }, { foodItem: updatedFoodItem });

    // Assert that the success toast was called
    expect(mockToast.success).toHaveBeenCalledWith(
      " Food-item updated successfully"
    );
    // Assert that the correct mutation was called
    expect(commit).toHaveBeenCalledWith("editFoodItem", updatedFoodItem);
    expect(mockToast.error).not.toHaveBeenCalled(); // Ensure no error toast is called
  });

  it("removeFoodItem commits data correctly", async () => {
    const commit = jest.fn();
    const idToRemove = "food_item_id";

    // Mock axios DELETE request for removing a food item
    mockAxios
      .onDelete(
        `http://localhost:3000/foodNutrition/deleteFoodItem?id=${idToRemove}`
      )
      .reply(200);

    // Call the action
    await actions.removeFoodItem({ commit }, { id: idToRemove });

    // Assert that the success toast was called
    expect(mockToast.success).toHaveBeenCalledWith(
      " Food-item removed successfully"
    );
    // Assert that the correct mutation was called
    expect(commit).toHaveBeenCalledWith("removeFoodItem", idToRemove);
    expect(mockToast.error).not.toHaveBeenCalled(); // Ensure no error toast is called
  });

  it("searchFoodItem commits data correctly", async () => {
    const commit = jest.fn();
    const itemName = "Apple";

    // Mock axios GET request for searching food items
    mockAxios
      .onGet(`http://localhost:3000/foodNutrition/filtered?name=${itemName}`)
      .reply(200, [{ _id: "apple_id", name: "Apple", category: "fruits" }]);

    // Call the action
    await actions.searchFoodItem({ commit }, itemName);

    // Assert that the correct mutation was called
    expect(commit).toHaveBeenCalledWith("setFoodItemSearch", [
      { _id: "apple_id", name: "Apple", category: "fruits" },
    ]);
    expect(mockToast.error).not.toHaveBeenCalled(); // Ensure no error toast is called
  });
});
