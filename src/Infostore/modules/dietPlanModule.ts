import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

interface State {
  dietPlan: any[];
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  dietPlan: [],
};

const mutations = {
  setDietPlan(state: State, dietPlan: any[]) {
    // Adjust the type according to your dietPlan object structure
    state.dietPlan = dietPlan;
  },
};

const actions = {
  async fetchDietPlan(
    { commit }: { commit: Commit },
    filteredFilters: FilteredFilters
  ) {
    try {
      let url = "http://localhost:3000/diet-plans";
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

        url += `/filter?${queryParams}`;
      }
      const response: AxiosResponse = await axios.get(url);

      // Commit mutation to update state with fetched dietPlan
      commit("setDietPlan", response.data);
    } catch (error) {
      console.error("Error fetching dietPlan:", error);
    }
  },
};

const getters = {
  // Getters to access state.dirtPlan
};

export default {
  state,
  mutations,
  actions,
  getters,
};
