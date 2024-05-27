import axios, { AxiosResponse, AxiosError } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

interface Yoga {
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
    console.log(index);
    if (index !== -1) {
      state.yogaSearch[index] = yoga;
    }
  },
  removeYoga(state: State, id: string) {
    state.yogaSearch = state.yogaSearch.filter((item) => item._id !== id);
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
      handleServerError(error);
    }
  },
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

  async removeYoga({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      console.log(id);
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
