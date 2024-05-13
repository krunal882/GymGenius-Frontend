import axios, { AxiosResponse } from "axios";
import { Commit, Dispatch } from "vuex";
import Cookies from "js-cookie";

interface UserInfo {
  _id: string;
  name: string;
  email: string;
  age: number;
  number: number;
  role: string;
  password: string;
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
}

const state: State = {
  userInfo: [],
  productData: [],
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
  setUsers(state: State, data: any) {
    state.userInfo = data;
  },
  setOrders(state: State, products: any) {
    state.productData = products;
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
      const url = `http://localhost:3000/auth/users?page=1&limit=10`;
      const config = createAxiosConfig();
      const response = await axios.get(url, config);
      const users = response.data;
      commit("setUsers", users);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
