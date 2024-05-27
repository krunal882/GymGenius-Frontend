import axios, { AxiosResponse, AxiosError } from "axios";
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
    cloudImg: string;
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
  foodItem: FoodItem[];
  searchFoodItem: FoodItem[];
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

const handleServerError = (error: AxiosError) => {
  if (!error.response) {
    useToast().error(
      "Network error. Please check your internet connection and try again."
    );
    return;
  }

  const { status, data } = error.response;
  if (status === 500) {
    useToast().error(
      "An error occurred on the server. Please try again later."
    );
  } else {
    const errorMessage =
      (data as { message: string }).message ||
      "Something went wrong. Please try again.";
    useToast().error(errorMessage);
  }
};

const mutations = {
  setFoodItem(state: State, foodItem: FoodItem[]) {
    state.foodItem = foodItem;
  },
  setFoodItemSearch(state: State, foodItem: FoodItem[]) {
    state.searchFoodItem = foodItem;
  },
  appendFoodItem(state, foodItem) {
    state.foodItem = [...state.foodItem, ...foodItem];
  },
  editFoodItem(state: State, foodItem: FoodItem) {
    const index = state.searchFoodItem.findIndex(
      (food) => food._id === foodItem._id
    );
    if (index !== -1) {
      state.searchFoodItem[index] = foodItem;
    }
  },
  removeFoodItem(state: State, id: string) {
    state.searchFoodItem = state.searchFoodItem.filter(
      (item) => item._id !== id
    );
  },
};

const actions = {
  async fetchFoodItem(
    { commit }: { commit: Commit },
    {
      filteredFilters,
      page,
      limit,
    }: { filteredFilters: FilteredFilters; page: number; limit: number }
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

        url += `/filtered?${queryParams}&page=${page}&limit=${limit}`;
      } else {
        url += `?page=${page}&limit=${limit}`;
      }
      const response: AxiosResponse = await axios.get(url, config);

      if (page === 1) {
        commit("setFoodItem", response.data);
      } else {
        commit("appendFoodItem", response.data);
      }
      return response.data;
    } catch (error) {
      handleServerError(error);
    }
  },

  async addFoodItem(
    { commit }: { commit: Commit },
    { foodItem }: { foodItem: FoodItem }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/foodNutrition/addFoodItem";
      const response = await axios.post(url, foodItem, config);
      if (response.status === 201) {
        useToast().success("New Food-item added successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  async searchFoodItem({ commit }: { commit: Commit }, name: string) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/foodNutrition/filtered?name=${name}`;
      const response = await axios.get(url, config);

      commit("setFoodItemSearch", response.data);
    } catch (error) {
      handleServerError(error);
    }
  },

  async editFoodItem(
    { commit }: { commit: Commit },
    { foodItem }: { foodItem: FoodItem }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/foodNutrition/updateFoodItem?id=${foodItem._id}`;
      const response = await axios.patch(url, foodItem, config);
      if (response.status === 200) {
        commit("editFoodItem", foodItem);
        useToast().success(" Food-item updated successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  async removeFoodItem({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/foodNutrition/deleteFoodItem?id=${id}`;
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        commit("removeFoodItem", id);
        useToast().success(" Food-item removed successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
