import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

interface State {
  foodItem: any[];
  searchFoodItem: any[];
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  foodItem: [],
  searchFoodItem: [],
};

const mutations = {
  setFoodItem(state: State, foodItem: any[]) {
    state.foodItem = foodItem;
  },
  setFoodItemSearch(state: State, foodItem: any[]) {
    state.searchFoodItem = foodItem;
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
        const queryParams = Object.entries(filteredFilters)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value
                .map((v) => `${key}=${encodeURIComponent(v)}`)
                .join("&");
            } else {
              return `${key}=${encodeURIComponent(value)}`;
            }
          })
          .join("&");

        url += `/filtered?${queryParams}`;
      } else {
        url += "?limit=10";
      }
      const response: AxiosResponse = await axios.get(url);

      commit("setFoodItem", response.data);
    } catch (error) {
      console.error("Error fetching foodItem:", error);
    }
  },

  async searchFoodItem({ commit }: { commit: Commit }, name: string) {
    const url = `http://localhost:3000/foodNutrition/filtered?name=${name}`;
    const response = await axios.get(url);
    commit("setFoodItemSearch", response.data);
  },

  async removeFoodItem({ commit }: { commit: Commit }, { id }: { id: string }) {
    const url = `http://localhost:3000/foodNutrition/deleteFoodItem?id=${id}`;
    const response = await axios.delete(url);
  },
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
