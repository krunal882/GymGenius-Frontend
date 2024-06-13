// this vuex store is for admin actions
import axios, { AxiosError } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// interface for the user
export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  number: string;
  role: string;
  password?: string;
  confirmPassword?: string;
  state: string;
  src?: string;
}

//interface for the product
interface ProductInfo {
  _id: string;
  category: string;
  src: string;
  title: string;
  price: number;
  original_price: string;
  off: string;
  state: string;
}

// interface for the orders
export interface OrderData {
  userId: string;
  productInfo: ProductInfo[];
}

// state interface
export interface State {
  userInfo: User[];
  productData: OrderData[];
  total: number;
  userDeleted: boolean;
}

//store state
const state: State = {
  userInfo: [],
  productData: [],
  total: 0,
  userDeleted: null,
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
  setUsers(state: State, data: User[]) {
    state.userInfo = data;
  },
  setOrders(state: State, products: OrderData[]) {
    state.productData = products;
  },
  setTotalItems(state: State, total: number) {
    state.total = total;
  },
  addUser(state: State, user: User) {
    state.userInfo.push(user);
  },
  deleteUser(state: State, id: string) {
    state.userInfo = state.userInfo.filter((user) => user._id !== id);
  },
  setUserDeleted(state: State, isDeleted: boolean) {
    state.userDeleted = isDeleted;
  },
};

// Vuex actions for asynchronously handling and committing state changes.
const actions = {
  // action to get all users information for admin
  async getAllUser(
    {
      commit,
    }: {
      commit: Commit;
    },
    { page, limit }: { page: number; limit: number }
  ) {
    try {
      const url = `http://localhost:3000/auth/users?page=${page}&limit=${limit}`;
      const config = createAxiosConfig();
      const response = await axios.get(url, config);
      const users = response.data.users;
      const totalItems = response.data.total;
      commit("setUsers", users);
      commit("setTotalItems", totalItems);
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to fetch user by name
  async fetchFilteredUser(
    { commit }: { commit: Commit },
    { name }: { name: string }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/auth/filtered?name=${name}`;
      const response = await axios.get(url, config);
      const users = response.data;
      const totalItems = response.data.length;
      commit("setUsers", users);
      commit("setTotalItems", totalItems);
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to add new user by admin
  async userAdd({ commit }: { commit: Commit }, { user }: { user: User }) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/addUser";
      const response = await axios.post(url, user, config);
      if (response.status === 201) {
        commit("addUser", user);
        useToast().success("New user added successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to delete an user by admin
  async userDelete(
    { commit }: { commit: Commit },
    { id, role, master }: { id: string; role: string; master: string }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/auth/deleteUser?id=${id}&role=${role}`;
      const response = await axios.delete(url, config);
      if (response.status === 200 && role === "user" && master === undefined) {
        Cookies.remove("token");
        if (response.status === 200) {
          commit("deleteUser", id);
          useToast().success(response.data);
        }
        commit("setUserDeleted", true);
      } else if (master) {
        commit("deleteUser", id);
        useToast().success(response.data);
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to get all received orders from the users
  async getAllOrders({ commit }: { commit: Commit }) {
    try {
      const url = "http://localhost:3000/store/orders";
      const config = createAxiosConfig();
      const response = await axios.get(url, config);
      const products = response.data;
      commit("setOrders", products);
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
