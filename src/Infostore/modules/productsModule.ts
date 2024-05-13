import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree } from "vuex";
import Cookies from "js-cookie";

interface State {
  product: any[]; // Adjust the type according to your product object structure
}

interface FilteredFilters {
  [key: string]: boolean | number;
}

const state: State = {
  product: [],
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
  setProduct(state: State, product: any[]) {
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
      const config = createAxiosConfig();
      let url = "http://localhost:3000/store";
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
        if (limit) {
          url += `?limit=${limit}`;
        }
      }

      const response: AxiosResponse = await axios.get(url, config);

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
