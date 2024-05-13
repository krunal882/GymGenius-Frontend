import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

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
      const response: AxiosResponse = await axios.get(url);
      commit("setDietPlan", response.data);
    } catch (error) {
      console.error("Error fetching dietPlan:", error);
    }
  },
  async searchDiet({ commit }: { commit: Commit }, name: string) {
    const url = `http://localhost:3000/diet-plans/filter?name=${name}`;
    const response = await axios.get(url);
    commit("setDietSearch", response.data);
  },

  async addDietPlan(
    { commit }: { commit: Commit },
    { dietPlan }: { dietPlan: DietPlan }
  ) {
    console.log(dietPlan);
    const url = "http://localhost:3000/diet-plans/add";
    const response = await axios.post(url, dietPlan);
    console.log(response);
  },

  async editDietPlan(
    { commit }: { commit: Commit },
    { id, dietPlan }: { id: string; dietPlan: DietPlan }
  ) {
    const url = `http://localhost:3000/diet-plans/update?id=${id}`;
    const response = await axios.patch(url, dietPlan);
    console.log(response);
  },

  async removeDiet({ commit }: { commit: Commit }, { id }: { id: string }) {
    const url = `http://localhost:3000/diet-plans/delete?id=${id}`;
    const response = await axios.delete(url);
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
