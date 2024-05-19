import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
interface DietPlan {
  _id: string;
  name: string;
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

interface State {
  dietPlan: any[];
  dietSearch: any[];
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  dietPlan: [],
  dietSearch: [],
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
  setDietPlan(state: State, dietPlan: any[]) {
    state.dietPlan = dietPlan;
  },
  setDietSearch(state: State, dietPlan: any[]) {
    state.dietSearch = dietPlan;
  },
};

const actions = {
  async fetchDietPlan(
    { commit }: { commit: Commit },
    filteredFilters: FilteredFilters
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

        url += `/filter?${queryParams}`;
      }
      const response: AxiosResponse = await axios.get(url, config);
      commit("setDietPlan", response.data);
    } catch (error) {
      console.error("Error fetching dietPlan:", error);
    }
  },
  async searchDiet({ commit }: { commit: Commit }, name: string) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/diet-plans/filter?name=${name}`;
    const response = await axios.get(url, config);
    commit("setDietSearch", response.data);
  },

  async addDietPlan(
    { commit }: { commit: Commit },
    { dietPlan }: { dietPlan: DietPlan }
  ) {
    const config = createAxiosConfig();
    const url = "http://localhost:3000/diet-plans/add";
    const response = await axios.post(url, dietPlan, config);
    if (response.status === 201) {
      useToast().success("New Diet-plan added successfully");
    }
    console.log(response);
  },

  async editDietPlan(
    { commit }: { commit: Commit },
    { id, dietPlan }: { id: string; dietPlan: DietPlan }
  ) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/diet-plans/update?id=${id}`;
    const response = await axios.patch(url, dietPlan, config);
    if (response.status === 200) {
      useToast().success(" Diet-plan updated successfully");
    }
  },

  async removeDiet({ commit }: { commit: Commit }, { id }: { id: string }) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/diet-plans/delete?id=${id}`;
    const response = await axios.delete(url, config);
    if (response.status === 200) {
      useToast().success(" Diet-plan removed successfully");
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
