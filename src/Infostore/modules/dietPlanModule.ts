// this vuex store is for dietPlan
import axios, { AxiosResponse, AxiosError } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// interface for the DietPlan
export interface DietPlan {
  _id: string;
  name: string;
  cloudImg: string;
  health_benefits: string;
  nutritions: string;
  culinary_uses: string;
  varieties: string;
  fun_facts_and_trivia: string;
  recipes_and_serving_ideas: {
    name: string;
    ingredients: string;
    instructions: string;
  }[];
}

// state interface
interface State {
  dietPlan: DietPlan[];
  dietSearch: DietPlan[];
  dietDetail: DietPlan;
}

interface FilteredFilters {
  [key: string]: string | string[];
}

//store state
const state: State = {
  dietPlan: [],
  dietSearch: [],
  dietDetail: null,
};

// getting token from the cookie
const createAxiosConfig = () => {
  const token = Cookies.get("token");
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// server side error handling
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

// mutations for the state changes
export const mutations = {
  setDietPlan(state: State, dietPlan: DietPlan[]) {
    state.dietPlan = dietPlan;
  },
  setDietSearch(state: State, dietPlan: DietPlan[]) {
    state.dietSearch = dietPlan;
  },
  appendDiet(state: State, diet: DietPlan[]) {
    state.dietPlan = [...state.dietPlan, ...diet];
  },
  removeDiet(state: State, id: string) {
    state.dietSearch = state.dietSearch.filter((item) => item._id !== id);
  },
  editDiet(state: State, { id, dietPlan }: { id: string; dietPlan: DietPlan }) {
    const index = state.dietSearch.findIndex((diet) => diet._id === id);
    if (index !== -1) {
      state.dietSearch[index] = dietPlan;
    }
  },
  setDietDetail(state: State, diet: DietPlan) {
    state.dietDetail = diet;
  },
};

// Vuex actions for asynchronously handling and committing state changes.
const actions = {
  //action to fetch diet plan
  async fetchDietPlan(
    { commit }: { commit: Commit },
    {
      filteredFilters,
      page,
      limit,
      id,
    }: {
      filteredFilters?: FilteredFilters;
      page: number;
      limit: number;
      id: string;
    }
  ) {
    try {
      const config = createAxiosConfig();
      let url = "http://localhost:3000/diet-plans";
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

        url += `/filter?${queryParams}&page=${page}&limit=${limit}`;
      } else if (id) {
        url += `/filter?dietId=${id}`;
      } else {
        url += `?page=${page}&limit=${limit}`;
      }
      const response: AxiosResponse = await axios.get(url, config);
      if (id) {
        commit("setDietDetail", response.data);
      }
      if (page === 1) {
        commit("setDietPlan", response.data);
      } else {
        commit("appendDiet", response.data);
      }
      return response.data;
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to search specific diet plan
  async searchDiet({ commit }: { commit: Commit }, name: string) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/diet-plans/filter?name=${name}`;
      const response = await axios.get(url, config);
      commit("setDietSearch", response.data);
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to add new diet plan
  async addDietPlan(
    { commit }: { commit: Commit },
    { dietPlan }: { dietPlan: DietPlan }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/diet-plans/add";
      const response = await axios.post(url, dietPlan, config);
      if (response.status === 201) {
        useToast().success("New Diet-plan added successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to edit existing diet plan
  async editDietPlan(
    { commit }: { commit: Commit },
    { id, dietPlan }: { id: string; dietPlan: DietPlan }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/diet-plans/update?id=${id}`;
      const response = await axios.patch(url, dietPlan, config);
      if (response.status === 200) {
        commit("editDiet", { id, dietPlan });
        useToast().success(" Diet-plan updated successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to remove diet plan
  async removeDiet({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/diet-plans/delete?id=${id}`;
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        commit("removeDiet", id);
        useToast().success(" Diet-plan removed successfully");
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
