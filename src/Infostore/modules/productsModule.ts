import axios, { AxiosResponse, AxiosError } from "axios";
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
  men: Product[];
  women: Product[];
  accessories: Product[];
  cardio: Product[];
  cycles: Product[];
  equipments: Product[];
  running: Product[];
  strength: Product[];
  supplements: Product[];
  yoga: Product[];
  detail: Product[];
  equipmentCarousal: Product[];
  supplementCarousal: Product[];
  cycleCarousal: Product[];
  cardioCarousal: Product[];
}

interface FilteredFilters {
  [key: string]: boolean | number | string;
}

const state: State = {
  product: [],
  productSearch: [],
  adminProduct: [],
  men: [],
  women: [],
  accessories: [],
  cardio: [],
  cycles: [],
  equipments: [],
  running: [],
  strength: [],
  supplements: [],
  yoga: [],
  detail: [],
  equipmentCarousal: [],
  supplementCarousal: [],
  cycleCarousal: [],
  cardioCarousal: [],
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
  setProduct(
    state: State,
    payload: { data: Product[]; category: string; store: string }
  ) {
    state[payload.store] = payload.data;
  },
  appendProducts(
    state: State,
    payload: { data: Product[]; category: string; store: string }
  ) {
    state[payload.store] = [...state[payload.store], ...payload.data];
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
      category,
      store,
    }: {
      filteredFilters: FilteredFilters;
      limit?: number;
      page?: number;
      url: string;
      role?: string;
      category: string;
      store: string;
    }
  ) {
    try {
      const config = createAxiosConfig();
      const params: Record<string, any> = {
        ...filteredFilters,
        category,
        limit,
        page,
      };

      const queryParams = Object.entries(params)
        .filter(
          ([, value]) => value !== undefined && value !== null && value !== ""
        )
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
        url += `/filtered?${queryParams}`;
      }
      const response: AxiosResponse = await axios.get(url, config);

      const data = response.data;
      if (role === "admin") {
        if (page === 1) {
          commit("setAdminProduct", data);
        } else {
          commit("appendAdminProduct", data);
        }
      }

      if (page === 1) {
        const data = response.data;
        commit("setProduct", { data, category, store });
      } else {
        const data = response.data;
        commit("appendProducts", { data, category, store });
      }

      return response.data;
    } catch (error) {
      handleServerError(error);
    }
  },

  async addProduct(
    { commit }: { commit: Commit },
    { product }: { product: Product }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/store/addProduct";
      const response = await axios.post(url, product, config);
      if (response.status === 201) {
        useToast().success("New Product added successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  async editProduct(
    { commit }: { commit: Commit },
    { product }: { product: Product }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/store/updateProduct?id=${product._id}`;
      const response = await axios.patch(url, product, config);
      if (response.status === 200) {
        commit("editProduct", product);
        useToast().success(" Product updated successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  async removeProduct({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/store/removeProduct?id=${id}`;
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        commit("removeProduct", id);
        useToast().success(" Product removed successfully");
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
