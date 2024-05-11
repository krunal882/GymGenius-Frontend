import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

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
