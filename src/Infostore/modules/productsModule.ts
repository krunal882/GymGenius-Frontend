import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree, ActionTree } from "vuex";

interface State {
  product: any[]; // Adjust the type according to your product object structure
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  product: [],
};

const mutations = {
  setProduct(state: State, product: any[]) {
    // Adjust the type according to your product object structure
    state.product = product;
  },
};
const actions = {
  async fetchProduct(
    { commit }: { commit: Commit },
    {
      filteredFilters,
      limit,
    }: { filteredFilters: FilteredFilters; limit?: number }
  ) {
    try {
      let url = "http://localhost:3000/store";

      // If filters are provided, add them to the URL
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
        // If limit is specified, add it as a query parameter
      } else {
        // If no filters are provided, and limit is specified, construct the URL accordingly
        if (limit) {
          url += `?limit=${limit}`;
        }
      }

      const response: AxiosResponse = await axios.get(url);

      commit("setProduct", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
};

const getters: GetterTree<State, any> = {
  getProduct(state: State): any[] {
    return state.product;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
