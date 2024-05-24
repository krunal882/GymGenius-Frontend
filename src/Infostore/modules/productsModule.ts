import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

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
  productSearch: Product[];
  adminProduct: Product[];
}

interface FilteredFilters {
  [key: string]: boolean | number | string;
}

const state: State = {
  product: [],
  productSearch: [],
  adminProduct: [],
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
  appendProducts(state, product) {
    state.product = [...state.product, ...product];
  },
  resetProducts(state) {
    state.product = [];
  },
  setAdminProduct(state: State, product: Product[]) {
    state.adminProduct = product;
  },
  appendAdminProduct(state: State, product: Product[]) {
    state.adminProduct = [...state.adminProduct, ...product];
  },
  editProduct(state: State, product: Product) {
    const index = state.adminProduct.findIndex(
      (item) => item._id === product._id
    );
    if (index !== -1) {
      state.adminProduct[index] = product;
    }
  },
  removeProduct(state: State, id: string) {
    state.adminProduct = state.adminProduct.filter((item) => item._id !== id);
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
      role,
    }: {
      filteredFilters: FilteredFilters;
      limit?: number;
      page?: number;
      url: string;
      role?: string;
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

      if (role === "admin" && page === 1) {
        commit("setAdminProduct", response.data);
      } else if (role === "admin" && page > 1) {
        commit("appendAdminProduct", response.data);
      } else if (role === "" && page === 1) {
        commit("setProduct", response.data);
      } else {
        commit("appendProducts", response.data);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },

  async addProduct(
    { commit }: { commit: Commit },
    { product }: { product: Product }
  ) {
    const config = createAxiosConfig();
    const url = "http://localhost:3000/store/addProduct";
    const response = await axios.post(url, product, config);
    if (response.status === 201) {
      useToast().success("New Product added successfully");
    }
  },

  async editProduct(
    { commit }: { commit: Commit },
    { product }: { product: Product }
  ) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/store/updateProduct?id=${product._id}`;
    const response = await axios.patch(url, product, config);
    if (response.status === 200) {
      commit("editProduct", product);
      useToast().success(" Product updated successfully");
    }
  },

  async removeProduct({ commit }: { commit: Commit }, { id }: { id: string }) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/store/removeProduct?id=${id}`;
    const response = await axios.delete(url, config);
    if (response.status === 200) {
      commit("removeProduct", id);
      useToast().success(" Product removed successfully");
    }
  },
};

const getters: GetterTree<State, Product> = {
  // getProduct(state: State): Product[] {
  //   return state.product;
  // },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
