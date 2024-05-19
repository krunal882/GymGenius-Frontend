import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

interface FoodItem {
  _id: string;
  name: string;
  category: string;
  health_benefits: string;
  nutritions: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    fiber: number;
    magnesium: number;
    phosphorus: number;
    vitamin_B6: number;
  };
  culinary_uses: string;
  varieties: string;
  fun_facts_and_trivia: string;
  recipes_and_serving_ideas: [
    {
      name: string;
      ingredients: string;
      instructions: string;
    }
  ];
}

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

const createAxiosConfig = () => {
  const token = Cookies.get("token");
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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
      const config = createAxiosConfig();
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
      const response: AxiosResponse = await axios.get(url, config);

      commit("setFoodItem", response.data);
    } catch (error) {
      console.error("Error fetching foodItem:", error);
    }
  },

  async addFoodItem(
    { commit }: { commit: Commit },
    { foodItem }: { foodItem: FoodItem }
  ) {
    const config = createAxiosConfig();
    const url = "http://localhost:3000/foodNutrition/addFoodItem";
    const response = await axios.post(url, foodItem, config);
    if (response.status === 201) {
      useToast().success("New Food-item added successfully");
    }
  },

  async searchFoodItem({ commit }: { commit: Commit }, name: string) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/foodNutrition/filtered?name=${name}`;
    const response = await axios.get(url, config);
    if (response.status === 200) {
      useToast().success(" Food-item updated successfully");
    }
    commit("setFoodItemSearch", response.data);
  },

  async editFoodItem(
    { commit }: { commit: Commit },
    { foodItem }: { foodItem: FoodItem }
  ) {
    const config = createAxiosConfig();
    console.log(foodItem);
    const url = `http://localhost:3000/foodNutrition/updateFoodItem?id=${foodItem._id}`;
    const response = await axios.patch(url, foodItem, config);
  },

  async removeFoodItem({ commit }: { commit: Commit }, { id }: { id: string }) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/foodNutrition/deleteFoodItem?id=${id}`;
    const response = await axios.delete(url, config);
    if (response.status === 200) {
      useToast().success(" Food-item removed successfully");
    }
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
