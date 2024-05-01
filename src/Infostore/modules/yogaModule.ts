import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

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
        // Construct the query parameters from filteredFilters object
        const queryParams = Object.entries(filteredFilters)
          .map(([key, value]) => {
            // Check if the value is an array
            if (Array.isArray(value)) {
              // If it's an array, create separate parameters for each value
              return value
                .map((v) => `${key}=${encodeURIComponent(v)}`)
                .join("&");
            } else {
              // Otherwise, create a single parameter
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
