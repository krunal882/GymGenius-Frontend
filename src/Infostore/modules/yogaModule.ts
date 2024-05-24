import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

interface Yoga {
  category_name: string;
  english_name: string;
  sanskrit_name_adapted: string;
  sanskrit_name: string;
  translation_name: string;
  pose_description: string;
  pose_benefits: string;
  instructions: string;
  url_png: string;
}

interface State {
  yoga: Yoga[];
  yogaSearch: Yoga[];
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  yoga: [],
  yogaSearch: [],
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
  setYoga(state: State, yoga: Yoga[]) {
    state.yoga = yoga;
  },
  setYogaSearch(state: State, yoga: Yoga[]) {
    state.yogaSearch = yoga;
  },
  appendYoga(state, yoga) {
    state.yoga = [...state.yoga, ...yoga];
  },
};
const actions = {
  async fetchYoga(
    { commit }: { commit: Commit },
    {
      filteredFilters,
      page,
      limit,
    }: { filteredFilters: FilteredFilters; page: number; limit: number }
  ) {
    try {
      const config = createAxiosConfig();
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
        url += `/filtered?${queryParams}&page=${page}&limit=${limit}`;
      } else {
        url += `?page=${page}&limit=${limit}`;
      }

      const response: AxiosResponse = await axios.get(url, config);

      if (page === 1) {
        commit("setYoga", response.data);
      } else {
        commit("appendYoga", response.data);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching yoga-poses:", error);
    }
  },
  async searchYoga({ commit }: { commit: Commit }, name: string) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/yoga-poses/filtered?name=${name}`;
    const response = await axios.get(url, config);
    commit("setYogaSearch", response.data);
  },

  async addYoga({ commit }: { commit: Commit }, { yoga }: { yoga: Yoga }) {
    const config = createAxiosConfig();
    const url = "http://localhost:3000/yoga-poses/addYoga";
    const response = await axios.post(url, yoga, config);
    if (response.status === 201) {
      useToast().success("New Yoga-pose added successfully");
    }
  },

  async editYoga(
    { commit }: { commit: Commit },
    { id, yoga }: { id: string; yoga: Yoga }
  ) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/yoga-poses/updateYoga?id=${id}`;
    const response = await axios.patch(url, yoga, config);
    if (response.status === 200) {
      useToast().success(" Yoga-pose updated successfully");
    }
  },

  async removeYoga({ commit }: { commit: Commit }, { id }: { id: string }) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/yoga-poses/deleteYoga?id=${id}`;
    const response = await axios.delete(url, config);
    if (response.status === 200) {
      useToast().success(" Yoga-pose removed successfully");
    }
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
