import axios from "axios";
import { Commit, GetterTree } from "vuex";

interface State {
  cartItems: any[]; // Adjust the type according to your product object structure
}

const state: State = {
  cartItems: [],
};

const mutations = {
  addToCart(state: State, product: any) {
    // Adjust the type according to your product object structure
    state.cartItems = product;
  },
  setCartItems(state: State, cartItems: any) {
    // Adjust the type according to your product object structure
    state.cartItems = cartItems;
    console.log(state.cartItems);
  },
  buyProduct(state: State, data: any) {
    const paymentUrl = data.message.url;
    // Redirect to the payment URL
    window.location.href = paymentUrl;
  },
};

const actions = {
  async addToCart(
    { commit }: { commit: Commit },
    { product, user }: { product: any; user: any }
  ) {
    try {
      await axios.post("http://localhost:3000/store/addToCart", {
        productId: product._id,
        user: user.id,
      });
      commit("addToCart", product);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error
    }
  },
  async fetchCart({ commit }: { commit: Commit }, { id }: { id: any }) {
    try {
      const response = await axios.get(
        `http://localhost:3000/store/cart?productId=${id}`
      );
      commit("setCartItems", response.data);
    } catch (error) {
      console.error("Error in payment:", error);
    }
  },

  async purchase(
    { commit }: { commit: Commit },
    { product }: { product: any }
  ) {
    try {
      const response = await axios.patch(
        "http://localhost:3000/store/purchase",
        {
          product: product,
        }
      );
      console.log(response);
      commit("buyProduct", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // Handle error
    }
  },
};

const getters: GetterTree<State, any> = {
  getCartItems(state: State): any[] {
    return state.cartItems;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
