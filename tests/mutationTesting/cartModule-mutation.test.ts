import {
  mutations,
  State,
  Product,
} from "../../src/Infostore/modules/cartModule";

describe("cart module Mutations", () => {
  let state: State;
  const product1: Product = {
    _id: "1",
    category: "men",
    src: "/images/product1.jpg",
    title: "Product 1",
    price: 100,
    original_price: "120",
    off: "20",
    state: "available",
    paymentId: "paymentId1",
  };
  const product2: Product = {
    _id: "2",
    category: "women",
    src: "/images/product2.jpg",
    title: "Product 2",
    price: 50,
    original_price: "60",
    off: "10",
    state: "available",
    paymentId: "paymentId2",
  };

  beforeEach(() => {
    state = {
      cartItems: [],
      history: [],
    };
  });

  it("setCartItems mutation sets the state.cartItems correctly", () => {
    mutations.setCartItems(state, [product1, product2]);
    expect(state.cartItems).toEqual([product1, product2]);
  });

  it("setHistory mutation sets the state.history correctly", () => {
    mutations.setHistory(state, [product1]);
    expect(state.history).toEqual([product1]);
  });

  it("addToCartItems mutation adds a product to state.cartItems correctly", () => {
    mutations.addToCartItems(state, product1);
    expect(state.cartItems).toEqual([product1]);
  });

  it("removeCartItem mutation removes a product from state.cartItems correctly", () => {
    // First, add some products to state
    state.cartItems = [product1, product2];
    mutations.removeCartItem(state, "1");
    expect(state.cartItems).toEqual([product2]);
  });

  it("removeReturnedProduct mutation removes a product from state.history correctly", () => {
    // First, add some products to state
    state.history = [product1, product2];
    mutations.removeReturnedProduct(state, "paymentId1");
    expect(state.history).toEqual([product2]);
  });
});
