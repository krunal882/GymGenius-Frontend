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
  async removeDiet({ commit }: { commit: Commit }, { id }: { id: string }) {
    const url = `http://localhost:3000/diet-plans/delete?id=${id}`;
    const response = await axios.delete(url);
    console.log(response);
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
