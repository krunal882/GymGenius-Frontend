import { mutations } from "../src/Infostore/modules/dietPlanModule";
import { DietPlan } from "../src/Infostore/modules/dietPlanModule";

describe("DietPlan Module Mutations", () => {
  let state;
  let initialDietPlan: DietPlan[];
  let initialDietSearch: DietPlan[];
  let editedDietPlan: DietPlan;

  beforeEach(() => {
    state = {
      dietPlan: [],
      dietSearch: [],
      dietDetail: null,
    };

    initialDietPlan = [
      {
        _id: "1",
        name: "Diet Plan 1",
        cloudImg: "Cloud Image URL 1",
        health_benefits: "Health benefits of Diet Plan 1",
        nutritions: "Nutritional information for Diet Plan 1",
        culinary_uses: "Culinary uses for Diet Plan 1",
        varieties: "Varieties of Diet Plan 1",
        fun_facts_and_trivia: "Fun facts and trivia about Diet Plan 1",
        recipes_and_serving_ideas: [
          {
            name: "Recipe 1",
            ingredients: "Ingredients for Recipe 1",
            instructions: "Instructions for Recipe 1",
          },
        ],
      },
    ];

    initialDietSearch = [
      ...initialDietPlan,
      {
        _id: "2",
        name: "Diet Plan 2",
        cloudImg: "Cloud Image URL 2",
        health_benefits: "Health benefits of Diet Plan 2",
        nutritions: "Nutritional information for Diet Plan 2",
        culinary_uses: "Culinary uses for Diet Plan 2",
        varieties: "Varieties of Diet Plan 2",
        fun_facts_and_trivia: "Fun facts and trivia about Diet Plan 2",
        recipes_and_serving_ideas: [
          {
            name: "Recipe 2",
            ingredients: "Ingredients for Recipe 2",
            instructions: "Instructions for Recipe 2",
          },
        ],
      },
    ];

    editedDietPlan = {
      _id: "1",
      name: "Edited Diet Plan 1",
      cloudImg: "Edited Cloud Image URL 1",
      health_benefits: "Edited health benefits of Diet Plan 1",
      nutritions: "Edited nutritional information for Diet Plan 1",
      culinary_uses: "Edited culinary uses for Diet Plan 1",
      varieties: "Edited varieties of Diet Plan 1",
      fun_facts_and_trivia: "Edited fun facts and trivia about Diet Plan 1",
      recipes_and_serving_ideas: [
        {
          name: "Edited Recipe 1",
          ingredients: "Edited ingredients for Recipe 1",
          instructions: "Edited instructions for Recipe 1",
        },
      ],
    };
  });

  it("setDietPlan mutation sets the state.dietPlan correctly", () => {
    mutations.setDietPlan(state, initialDietPlan);
    expect(state.dietPlan).toEqual(initialDietPlan);
  });

  it("setDietSearch mutation sets the state.dietSearch correctly", () => {
    mutations.setDietSearch(state, initialDietSearch);
    expect(state.dietSearch).toEqual(initialDietSearch);
  });

  it("appendDiet mutation appends diet plans to state.dietPlan correctly", () => {
    mutations.setDietPlan(state, initialDietPlan);

    const newDietPlans: DietPlan[] = [
      {
        _id: "3",
        name: "Diet Plan 3",
        cloudImg: "Cloud Image URL 3",
        health_benefits: "Health benefits of Diet Plan 3",
        nutritions: "Nutritional information for Diet Plan 3",
        culinary_uses: "Culinary uses for Diet Plan 3",
        varieties: "Varieties of Diet Plan 3",
        fun_facts_and_trivia: "Fun facts and trivia about Diet Plan 3",
        recipes_and_serving_ideas: [
          {
            name: "Recipe 3",
            ingredients: "Ingredients for Recipe 3",
            instructions: "Instructions for Recipe 3",
          },
        ],
      },
    ];

    mutations.appendDiet(state, newDietPlans);

    const expectedDietPlans = [...initialDietPlan, ...newDietPlans];
    expect(state.dietPlan).toEqual(expectedDietPlans);
  });

  it("editDiet mutation edits a diet plan in state.dietSearch correctly", () => {
    mutations.setDietSearch(state, initialDietSearch);

    mutations.editDiet(state, { id: "1", dietPlan: editedDietPlan });

    const editedIndex = state.dietSearch.findIndex(
      (diet) => diet._id === editedDietPlan._id
    );
    expect(editedIndex).not.toBe(-1); // Ensure the diet plan was found

    if (editedIndex !== -1) {
      expect(state.dietSearch[editedIndex]).toEqual(editedDietPlan);
    }
  });

  it("removeDiet mutation removes a diet plan from state.dietSearch correctly", () => {
    mutations.setDietSearch(state, initialDietSearch);

    const dietIdToRemove = "1";
    mutations.removeDiet(state, dietIdToRemove);

    const remainingDietPlans = state.dietSearch.filter(
      (diet) => diet._id !== dietIdToRemove
    );
    expect(state.dietSearch).toEqual(remainingDietPlans);
  });

  it("setDietDetail mutation sets the state.dietDetail correctly", () => {
    const dietDetail: DietPlan = {
      _id: "1",
      name: "Diet Plan Detail 1",
      cloudImg: "Cloud Image URL Detail 1",
      health_benefits: "Health benefits of Diet Plan Detail 1",
      nutritions: "Nutritional information for Diet Plan Detail 1",
      culinary_uses: "Culinary uses for Diet Plan Detail 1",
      varieties: "Varieties of Diet Plan Detail 1",
      fun_facts_and_trivia: "Fun facts and trivia about Diet Plan Detail 1",
      recipes_and_serving_ideas: [
        {
          name: "Recipe Detail 1",
          ingredients: "Ingredients for Recipe Detail 1",
          instructions: "Instructions for Recipe Detail 1",
        },
      ],
    };

    mutations.setDietDetail(state, dietDetail);
    expect(state.dietDetail).toEqual(dietDetail);
  });
});
