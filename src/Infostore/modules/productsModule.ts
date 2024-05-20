import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree } from "vuex";
import Cookies from "js-cookie";

interface Product {
  _id: string;
  category: string;
  src: string;
  title: string;
  price: number;
  original_price: string;
  off: string;
  state: string;
}

interface State {
  product: Product[];
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
  setProduct(state: State, product: Product[]) {
    state.product = product;
  },
};
const actions = {
  async fetchProduct(
    { commit, state }: { commit: Commit; state: any },
    {
      filteredFilters,
      limit,
      page,
      url,
    }: {
      filteredFilters: FilteredFilters;
      limit?: number;
      page?: number;
      url: string;
    }
  ) {
    try {
      const config = createAxiosConfig();
      const params: Record<string, any> = { ...filteredFilters, limit, page };

      const queryParams = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
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

      if (queryParams) {
        url += `?${queryParams}`;
      }
      const response: AxiosResponse = await axios.get(url, config);

      const newProducts = response.data;
      const currentProducts = state.product || [];

      const updatedProducts =
        page && page > 1 ? [...currentProducts, ...newProducts] : newProducts;

      commit("setProduct", updatedProducts);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
};

const getters: GetterTree<State, Product> = {
  getProduct(state: State): Product[] {
    return state.product;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
