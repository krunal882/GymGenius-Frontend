import axios from "axios";
import { Commit, Dispatch } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

interface State {
  cartItems: any[];
  history: any[];
}

const state: State = {
  cartItems: [],
  history: [],
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
  setCartItems(state: State, cartItems: any) {
    state.cartItems = cartItems;
  },
  buyProduct(state: State, data: any) {
    const paymentUrl = data.message.url;
    window.location.href = paymentUrl;
  },
  setHistory(state: State, history: any) {
    state.history = history;
  },
  addToCartItems(state: State, product: any) {
    state.cartItems.push(product);
  },
};

const actions = {
  async addToCart(
    { commit }: { commit: Commit },
    {
      productId,
      status,
      userId,
      product,
    }: { productId: string; status: string; userId: string; product: any }
  ) {
    try {
      const config = createAxiosConfig();

      const response = await axios.post(
        "http://localhost:3000/store/addToCart",
        {
          userId,
          product: [{ status, productId }],
        },
        config
      );
      commit("addToCartItems", product);
      if (response.status === 201) {
        useToast().success("Product added to cart successfully");
      }
      console.log("product added into cart ");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  },
  async fetchCart(
    { commit }: { commit: Commit },
    { userId, status }: { userId: any; status: string }
  ) {
    try {
      const config = createAxiosConfig();
      const response = await axios.get(
        `http://localhost:3000/store/cart?userId=${userId}`,
        config
      );
      if (response?.data[0]?.product?.length > 0) {
        const allProducts = response.data[0].product;
        const filteredProducts = allProducts.filter(
          (item: { status: string }) => item.status === status
        );
        const id = filteredProducts.map(
          (item: { productId: string }) => item.productId
        );
        if (id.length != 0) {
          const idParams = id.map((id: any) => `id=${id}`).join("&");
          const getProduct = await axios.get(
            `http://localhost:3000/store/filtered?${idParams}`,
            config
          );
          if (status == "pending") {
            commit("setCartItems", getProduct.data);
          } else if (status == "done") {
            commit("setHistory", getProduct.data);
          }
        }
      }
    } catch (error) {
      console.error("Error in fetching cart item:", error);
    }
  },

  async removeCart(
    { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
    { productId, userId }: { productId: string; userId: string }
  ) {
    try {
      const config = createAxiosConfig();
      const response = await axios.delete(
        "http://localhost:3000/store/removeCart",
        {
          ...config,

          data: {
            userId,
            productId,
          },
        }
      );
      if (response.status === 200) {
        useToast().success("Product removed from cart");
      }
      await dispatch("fetchCart", { userId, status: "pending" });
      console.log("product removed from cart ");
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  },

  async addHistory(
    { commit }: { commit: Commit },
    { productId, userId }: { productId: string; userId: string }
  ) {
    try {
      const config = createAxiosConfig();

      await axios.patch(
        "http://localhost:3000/store/updateCart",
        {
          userId,
          productId,
        },
        config
      );
      console.log("product added to history ");
    } catch (error) {
      console.error("Error adding product to history:", error);
    }
  },

  async purchase(
    { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
    {
      title,
      price,
      quantity,
      productId,
      userId,
      email,
    }: {
      price: number;
      quantity: string;
      title: string;
      productId: string[];
      userId: string;
      email: string;
    }
  ) {
    try {
      if (productId.length === 1) {
        await dispatch("addToCart", { userId, productId, status: "done" });
      }
      const config = createAxiosConfig();

      const response = await axios.patch(
        "http://localhost:3000/store/purchase",
        {
          price,
          quantity,
          title,
          email,
        },
        config
      );
      commit("buyProduct", response.data);
      if (productId.length > 1) {
        await dispatch("addHistory", { productId, userId });
      }
    } catch (error) {
      console.error("Error while buying product to cart:", error);
    }
  },
};

// const getters: GetterTree<State, any> = {
//   getCartItems(state: State): any[] {
//     return state.cartItems;
//   },
// };

export default {
  state,
  mutations,
  actions,
};
