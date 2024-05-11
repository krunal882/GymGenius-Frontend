import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

interface Yoga {
  category_name: string;
  english_name: string;
  sanskrit_name_adapted: string;
  sanskrit_name: string;
  translation_name: string;
  pose_description: string;
  pose_benefits: string;
  instructions: string;
}

interface State {
  yoga: any[];
  yogaSearch: any[];
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  yoga: [],
  yogaSearch: [],
};

const mutations = {
  setYoga(state: State, yoga: any[]) {
    state.yoga = yoga;
  },
  setYogaSearch(state: State, yoga: any[]) {
    state.yogaSearch = yoga;
  },
};
const actions = {
  async fetchYoga(
    { commit }: { commit: Commit },
    filteredFilters: FilteredFilters
  ) {
    try {
      let url = "http://localhost:3000/yoga-poses";
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

      commit("setYoga", response.data);
    } catch (error) {
      console.error("Error fetching yoga-poses:", error);
    }
  },

  async searchYoga({ commit }: { commit: Commit }, name: string) {
    const url = `http://localhost:3000/yoga-poses/filtered?name=${name}`;
    const response = await axios.get(url);
    commit("setYogaSearch", response.data);
  },

  async editYoga(
    { commit }: { commit: Commit },
    { id, yoga }: { id: string; yoga: Yoga }
  ) {
    const url = `http://localhost:3000/yoga-poses/updateYoga?id=${id}`;
    const response = await axios.patch(url, yoga);
  },

  async removeYoga({ commit }: { commit: Commit }, { id }: { id: string }) {
    const url = `http://localhost:3000/yoga-poses/deleteYoga?id=${id}`;
    const response = await axios.delete(url);
  },
};

const getters = {
  // Getters to access state.yoga
};

export default {
  state,
  mutations,
  actions,
  getters,
};
