// this vuex store is for yoga actions
import axios, { AxiosResponse, AxiosError } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// interface for the yoga
export interface Yoga {
  _id: string;
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

// state interface
export interface State {
  yoga: Yoga[];
  yogaSearch: Yoga[];
  yogaDetail: Yoga;
}

interface FilteredFilters {
  [key: string]: string | string[];
}

//store state
const state: State = {
  yoga: [],
  yogaSearch: [],
  yogaDetail: null,
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
  setYoga(state: State, yoga: Yoga[]) {
    state.yoga = yoga;
  },
  setYogaSearch(state: State, yoga: Yoga[]) {
    state.yogaSearch = yoga;
  },
  appendYoga(state: State, yoga: Yoga[]) {
    state.yoga = [...state.yoga, ...yoga];
  },

  editYoga(state: State, yoga: Yoga) {
    const index = state.yogaSearch.findIndex((item) => item._id === yoga._id);
    if (index !== -1) {
      state.yogaSearch[index] = yoga;
    }
  },
  removeYoga(state: State, id: string) {
    state.yogaSearch = state.yogaSearch.filter((item) => item._id !== id);
  },
  setYogaDetail(state: State, yoga: Yoga) {
    state.yogaDetail = yoga;
  },
};

// Vuex actions for asynchronously handling and committing state changes.
export const actions = {
  // action to fetch yoga poses
  async fetchYoga(
    { commit }: { commit: Commit },
    {
      filteredFilters,
      page,
      limit,
      id,
    }: {
      filteredFilters: FilteredFilters;
      page: number;
      limit: number;
      id: string;
    }
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
      } else if (id) {
        url += `/filtered?yogaId=${id}`;
      } else {
        url += `?page=${page}&limit=${limit}`;
      }

      const response: AxiosResponse = await axios.get(url, config);

      if (id) {
        commit("setYogaDetail", response.data);
      }

      if (page === 1) {
        commit("setYoga", response.data);
      } else {
        commit("appendYoga", response.data);
      }
      return response.data;
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to search yoga
  async searchYoga({ commit }: { commit: Commit }, name: string) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/yoga-poses/filtered?name=${name}`;
      const response = await axios.get(url, config);
      commit("setYogaSearch", response.data);
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to add new yoga pose
  async addYoga({ commit }: { commit: Commit }, { yoga }: { yoga: Yoga }) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/yoga-poses/addYoga";
      const response = await axios.post(url, yoga, config);
      if (response.status === 201) {
        useToast().success("New Yoga-pose added successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to edit existing yoga pose
  async editYoga({ commit }: { commit: Commit }, { yoga }: { yoga: Yoga }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/yoga-poses/updateYoga?id=${yoga._id}`;
      const response = await axios.patch(url, yoga, config);
      if (response.status === 200) {
        commit("editYoga", yoga);
        useToast().success(" Yoga-pose updated successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to delete yoga pose
  async removeYoga({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/yoga-poses/deleteYoga?id=${id}`;
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        commit("removeYoga", id);
        useToast().success(" Yoga-pose removed successfully");
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
