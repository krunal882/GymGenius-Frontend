import axios, { AxiosResponse } from "axios";
import { Commit, Dispatch } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  age: number;
  number: number;
  role: string;
  state: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  number: string;
  role: string;
  password: string;
  confirmPassword: string;
  state: string;
  src: string;
}

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

interface OrderData {
  userId: string;
  productInfo: ProductInfo[];
}

interface State {
  userInfo: UserInfo[];
  productData: OrderData[];
  total: number;
  userDeleted: string;
}

const state: State = {
  userInfo: [],
  productData: [],
  total: 0,
  userDeleted: "",
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
  setUsers(state: State, data: UserInfo[]) {
    state.userInfo = data;
  },
  setOrders(state: State, products: OrderData[]) {
    state.productData = products;
  },
  setTotalItems(state: State, total: number) {
    state.total = total;
  },
  addUser(state: State, user: UserInfo) {
    state.userInfo.push(user);
  },
  deleteUser(state: State, id: string) {
    state.userInfo = state.userInfo.filter((user) => user._id !== id);
  },
  setUserDeleted(state: State, isDeleted: string) {
    state.userDeleted = isDeleted;
  },
};
const actions = {
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
      useToast().error("Error in fetching users");
    }
  },

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
      useToast().error("Error in user creation");
    }
  },

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
          useToast().success(" User deleted successfully");
        }
        commit("setUserDeleted", true);
      } else if (master) {
        commit("deleteUser", id);
        useToast().success(" User deleted successfully");
      }
    } catch (error) {
      useToast().error("Error in user delete");
    }
  },

  async getAllOrders({ commit }: { commit: Commit }) {
    try {
      const url = "http://localhost:3000/store/orders";
      const config = createAxiosConfig();
      const response = await axios.get(url, config);
      const products = response.data;
      commit("setOrders", products);
    } catch (error) {
      useToast().error("Error in fetching orders");
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
