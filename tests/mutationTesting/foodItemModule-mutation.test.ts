import { mutations } from "../../src/Infostore/modules/foodItemModule";
import { FoodItem } from "../../src/Infostore/modules/foodItemModule";

describe("FoodItem Module Mutations", () => {
  let state;
  let initialFoodItems: FoodItem[];
  let initialSearchFoodItems: FoodItem[];
  let editedFoodItem: FoodItem;

  beforeEach(() => {
    state = {
      foodItem: [],
      searchFoodItem: [],
      foodDetail: null,
    };

    initialFoodItems = [
      {
        _id: "1",
        name: "Food Item 1",
        category: "Category 1",
        health_benefits: "Health Benefits 1",
        nutritions: {
          calories: 100,
          protein: 10,
          fat: 5,
          carbohydrates: 15,
          fiber: 3,
          magnesium: 20,
          phosphorus: 30,
          vitamin_B6: 1,
          cloudImg: "Cloud Image URL 1",
        },
        culinary_uses: "Culinary Uses 1",
        varieties: "Varieties 1",
        fun_facts_and_trivia: "Fun Facts 1",
        recipes_and_serving_ideas: [
          {
            name: "Recipe 1",
            ingredients: "Ingredients 1",
            instructions: "Instructions 1",
          },
        ],
      },
    ];

    initialSearchFoodItems = [
      ...initialFoodItems,
      {
        _id: "2",
        name: "Food Item 2",
        category: "Category 2",
        health_benefits: "Health Benefits 2",
        nutritions: {
          calories: 150,
          protein: 12,
          fat: 7,
          carbohydrates: 20,
          fiber: 5,
          magnesium: 25,
          phosphorus: 35,
          vitamin_B6: 2,
          cloudImg: "Cloud Image URL 2",
        },
        culinary_uses: "Culinary Uses 2",
        varieties: "Varieties 2",
        fun_facts_and_trivia: "Fun Facts 2",
        recipes_and_serving_ideas: [
          {
            name: "Recipe 2",
            ingredients: "Ingredients 2",
            instructions: "Instructions 2",
          },
        ],
      },
    ];

    editedFoodItem = {
      ...initialSearchFoodItems[0],
      name: "Edited Food Item 1",
      category: "Edited Category 1",
      health_benefits: "Edited Health Benefits 1",
      nutritions: {
        ...initialSearchFoodItems[0].nutritions,
        calories: 120,
        protein: 11,
        fat: 6,
        carbohydrates: 18,
        fiber: 4,
        magnesium: 22,
        phosphorus: 32,
        vitamin_B6: 1.5,
        cloudImg: "Edited Cloud Image URL 1",
      },
      culinary_uses: "Edited Culinary Uses 1",
      varieties: "Edited Varieties 1",
      fun_facts_and_trivia: "Edited Fun Facts 1",
      recipes_and_serving_ideas: [
        {
          name: "Edited Recipe 1",
          ingredients: "Edited Ingredients 1",
          instructions: "Edited Instructions 1",
        },
      ],
    };
  });

  it("setFoodItem mutation sets the state.foodItem correctly", () => {
    mutations.setFoodItem(state, initialFoodItems);
    expect(state.foodItem).toEqual(initialFoodItems);
  });

  it("setFoodItemSearch mutation sets the state.searchFoodItem correctly", () => {
    mutations.setFoodItemSearch(state, initialSearchFoodItems);
    expect(state.searchFoodItem).toEqual(initialSearchFoodItems);
  });

  it("appendFoodItem mutation appends food items to state.foodItem correctly", () => {
    mutations.setFoodItem(state, initialFoodItems);
    mutations.appendFoodItem(state, [initialSearchFoodItems[1]]);
    const expectedFoodItems = [...initialFoodItems, initialSearchFoodItems[1]];
    expect(state.foodItem).toEqual(expectedFoodItems);
  });

  it("editFoodItem mutation edits a food item in state.searchFoodItem correctly", () => {
    state.searchFoodItem = [...initialSearchFoodItems];
    mutations.editFoodItem(state, editedFoodItem);
    const editedIndex = state.searchFoodItem.findIndex(
      (food) => food._id === editedFoodItem._id
    );
    expect(editedIndex).not.toBe(-1);
    if (editedIndex !== -1) {
      expect(state.searchFoodItem[editedIndex]).toEqual(editedFoodItem);
    }
  });

  it("removeFoodItem mutation removes a food item from state.searchFoodItem correctly", () => {
    state.searchFoodItem = [...initialSearchFoodItems];
    mutations.removeFoodItem(state, "1");
    const removedIndex = state.searchFoodItem.findIndex(
      (food) => food._id === "1"
    );
    expect(removedIndex).toBe(-1);
  });
});
