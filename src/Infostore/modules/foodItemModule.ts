import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

interface State {
  foodItem: any[]; // Adjust the type according to your food-item object structure
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  foodItem: [],
};

const mutations = {
  setFoodItem(state: State, foodItem: any[]) {
    // Adjust the type according to your food-item object structure
    state.foodItem = foodItem;
  },
};

const actions = {
  async fetchFoodItem(
    { commit }: { commit: Commit },
    filteredFilters: FilteredFilters
  ) {
    try {
      let url = "http://localhost:3000/foodNutrition";
      if (filteredFilters && Object.keys(filteredFilters).length > 0) {
        // Construct the query parameters from filteredFilters object
        const queryParams = Object.entries(filteredFilters)
          .map(([key, value]) => {
            // Check if the value is an array
            if (Array.isArray(value)) {
              // If it's an array, create separate parameters for each value
              return value
                .map((v) => `${key}=${encodeURIComponent(v)}`)
                .join("&");
            } else {
              // Otherwise, create a single parameter
              return `${key}=${encodeURIComponent(value)}`;
            }
          })
          .join("&");

        url += `/filtered?${queryParams}`;
      } else {
        url += "?limit=10";
      }
      console.log(url);
      // Make the GET request with the constructed URL
      const response: AxiosResponse = await axios.get(url);

      // Commit mutation to update state with fetched foodItem
      commit("setFoodItem", response.data);
    } catch (error) {
      console.error("Error fetching foodItem:", error);
    }
  },
  async menProduct() {},
};

const getters = {
  // Getters to access state.foodItem
};

export default {
  state,
  mutations,
  actions,
  getters,
};
