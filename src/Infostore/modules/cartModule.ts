import axios, { AxiosError } from "axios";
import { Commit, Dispatch } from "vuex";
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
  paymentId: string;
}

interface State {
  cartItems: Product[];
  history: Product[];
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
  setCartItems(state: State, cartItems: Product[]) {
    state.cartItems = cartItems;
  },
  buyProduct(state: State, data: any) {
    const paymentUrl = data.message.url;
    window.location.href = paymentUrl;
  },
  setHistory(state: State, history: Product[]) {
    state.history = history;
  },
  addToCartItems(state: State, product: Product) {
    state.cartItems.push(product);
  },
  removeCartItem(state: State, id: string) {
    state.cartItems = state.cartItems.filter((item) => item._id !== id);
  },
  removeReturnedProduct(state: State, id: string) {
    state.history = state.history.filter((item) => item.paymentId !== id);
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
    }: { productId: string; status: string; userId: string; product: Product }
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
        useToast().success(response.data);
      }
    } catch (error) {
      handleServerError(error);
    }
  },
  async fetchCart(
    { commit }: { commit: Commit },
    { userId, status }: { userId: string; status: string }
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
        const idsAndPayments = filteredProducts.map(
          (item: { productId: string; paymentId?: string }) => ({
            productId: item.productId,
            paymentId: item.paymentId,
          })
        );
        if (idsAndPayments.length > 0) {
          const idParams = idsAndPayments
            .map(({ productId }) => `id=${productId}`)
            .join("&");
          const getProductResponse = await axios.get(
            `http://localhost:3000/store/filtered?${idParams}`,
            config
          );
          if (idsAndPayments[0].paymentId !== undefined) {
            const productsWithPaymentId = getProductResponse.data.map(
              (product: { _id: string }) => {
                const paymentInfo = idsAndPayments.find(
                  (item) => item.productId == product._id
                );
                return {
                  ...product,
                  paymentId: paymentInfo.paymentId,
                };
              }
            );
            if (status == "done") {
              commit("setHistory", productsWithPaymentId);
            }
          }

          if (status == "pending") {
            commit("setCartItems", getProductResponse.data);
          }
        }
      }
    } catch (error) {
      console.log(error);
      handleServerError(error);
    }
  },

  async removeCart(
    { commit }: { commit: Commit },
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
        commit("removeCartItem", productId);
        useToast().success(response.data);
      }
    } catch (error) {
      handleServerError(error);
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
      productId: string;
      userId: string;
      email: string;
    }
  ) {
    try {
      if (productId.length === 1) {
        await dispatch("addToCart", { userId, productId, status: "pending" });
      }
      const config = createAxiosConfig();

      const response = await axios.patch(
        "http://localhost:3000/store/purchase",
        {
          price,
          quantity,
          title,
          email,
          productId,
          userId,
        },
        config
      );
      commit("buyProduct", response.data);
    } catch (error) {
      handleServerError(error);
    }
  },
  async return(
    { commit }: { commit: Commit },
    { paymentId }: { paymentId: string }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/store/refund";

      const response = await axios.patch(url, paymentId, config);
      if (response.data.status === "succeeded") {
        commit("removeReturnedProduct", paymentId);
        useToast().success(
          "Product successfully returned. Refund process initiated"
        );
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
