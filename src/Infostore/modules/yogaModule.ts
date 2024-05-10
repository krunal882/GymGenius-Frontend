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
  yoga: any[]; // Adjust the type according to your Yoga object structure
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  yoga: [],
};

const mutations = {
  setYoga(state: State, yoga: any[]) {
    // Adjust the type according to your Yoga object structure
    state.yoga = yoga;
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
        console.log(url);
      }

      // Make the GET request with the constructed URL
      const response: AxiosResponse = await axios.get(url);

      // Commit mutation to update state with fetched Yoga
      commit("setYoga", response.data);
    } catch (error) {
      console.error("Error fetching yoga-poses:", error);
    }
  },
  async editYoga(
    { commit }: { commit: Commit },
    { id, yoga }: { id: string; yoga: Yoga }
  ) {
    console.log(yoga, id);
    const url = `http://localhost:3000/yoga-poses/updateYoga?id=${id}`;
    const response = await axios.patch(url, yoga);
    console.log(response.data);
  },

  async removeYoga({ commit }: { commit: Commit }, { id }: { id: string }) {
    console.log(id);
    const url = `http://localhost:3000/yoga-poses/deleteYoga?id=${id}`;
    const response = await axios.delete(url);
    console.log(response);
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
