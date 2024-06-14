import { actions } from "../../src/Infostore/modules/cartModule"; // Adjust import path as per your project
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification"; // Adjust import path as per your setup

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("cartModule actions", () => {
  let mockAxios;
  let mockToast;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };

    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  afterEach(() => {
    mockAxios.restore();
    jest.clearAllMocks();
  });

  it("adds product to cart and commits mutation", async () => {
    const product = {
      _id: "p1",
      category: "electronics",
      src: "image.jpg",
      title: "Phone",
      price: 500,
      original_price: "600",
      off: "100",
      state: "new",
      paymentId: "pay1",
    };
    const userId = "123";
    const status = "pending";
    const productId = product._id;

    const mockCommit = jest.fn();

    // Mock axios POST request for adding product to cart
    mockAxios
      .onPost("http://localhost:3000/store/addToCart")
      .reply(201, { message: "Product added to cart" });

    // Call the action
    await actions.addToCart(
      { commit: mockCommit },
      { productId, status, userId, product }
    );

    // Assert that the correct mutation was called
    expect(mockCommit).toHaveBeenCalledWith("addToCartItems", product);
    expect(mockToast.success).toHaveBeenCalledWith({
      message: "Product added to cart",
    });
  });

  it("fetches cart products and commits mutations", async () => {
    const userId = "123";
    const status = "pending";
    const mockCommit = jest.fn();

    const mockResponseData = [
      {
        product: [
          { status: "pending", productId: "p1" },
          { status: "done", productId: "p2", paymentId: "pay1" },
        ],
      },
    ];

    const mockProductData = [
      {
        _id: "p1",
        category: "electronics",
        src: "image.jpg",
        title: "Phone",
        price: 500,
        original_price: "600",
        off: "100",
        state: "new",
      },
    ];

    // Mock axios GET request for cart
    mockAxios
      .onGet(`http://localhost:3000/store/cart?userId=${userId}`)
      .reply(200, mockResponseData);

    // Mock axios GET request for products
    mockAxios
      .onGet("http://localhost:3000/store/filtered?id=p1")
      .reply(200, mockProductData);

    // Call the action
    await actions.fetchCart({ commit: mockCommit }, { userId, status });

    // Assert that the correct mutation was called
    expect(mockCommit).toHaveBeenCalledWith("setCartItems", mockProductData);
  });

  it("removes product from cart and commits mutation", async () => {
    const productId = "p1";
    const userId = "123";

    const mockCommit = jest.fn();

    // Mock axios DELETE request for removing product from cart
    mockAxios
      .onDelete("http://localhost:3000/store/removeCart")
      .reply(200, { message: "Product removed from cart" });

    // Call the action
    await actions.removeCart({ commit: mockCommit }, { productId, userId });

    // Assert that the correct mutation was called
    expect(mockCommit).toHaveBeenCalledWith("removeCartItem", productId);
    expect(mockToast.success).toHaveBeenCalledWith({
      message: "Product removed from cart",
    });
  });

  it("purchases product and commits mutation", async () => {
    const title = "Phone";
    const price = 500;
    const quantity = "1";
    const productId = "p1";
    const userId = "123";
    const email = "user@example.com";

    const mockCommit = jest.fn();
    const mockDispatch = jest.fn();

    // Mock axios PATCH request for purchasing product
    mockAxios
      .onPatch("http://localhost:3000/store/purchase")
      .reply(200, { message: { url: "http://payment.url" } });

    // Call the action
    await actions.purchase(
      { commit: mockCommit, dispatch: mockDispatch },
      { title, price, quantity, productId, userId, email }
    );

    // Assert that the correct mutation was called
    expect(mockCommit).toHaveBeenCalledWith("buyProduct", {
      message: { url: "http://payment.url" },
    });
  });

  it("handles server error gracefully during addToCart", async () => {
    const product = {
      _id: "p1",
      category: "electronics",
      src: "image.jpg",
      title: "Phone",
      price: 500,
      original_price: "600",
      off: "100",
      state: "new",
      paymentId: "pay1",
    };
    const userId = "123";
    const status = "pending";
    const productId = product._id;

    const mockCommit = jest.fn();

    // Mock axios POST request to simulate server error
    mockAxios
      .onPost("http://localhost:3000/store/addToCart")
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.addToCart(
      { commit: mockCommit },
      { productId, status, userId, product }
    );

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "addToCartItems",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during fetchCart", async () => {
    const userId = "123";
    const status = "pending";
    const mockCommit = jest.fn();

    // Mock axios GET request to simulate server error
    mockAxios
      .onGet(`http://localhost:3000/store/cart?userId=${userId}`)
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.fetchCart({ commit: mockCommit }, { userId, status });

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "setCartItems",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during removeCart", async () => {
    const productId = "p1";
    const userId = "123";

    const mockCommit = jest.fn();

    // Mock axios DELETE request to simulate server error
    mockAxios
      .onDelete("http://localhost:3000/store/removeCart")
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.removeCart({ commit: mockCommit }, { productId, userId });

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "removeCartItem",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during purchase", async () => {
    const title = "Phone";
    const price = 500;
    const quantity = "1";
    const productId = "p1";
    const userId = "123";
    const email = "user@example.com";

    const mockCommit = jest.fn();
    const mockDispatch = jest.fn();

    // Mock axios PATCH request to simulate server error
    mockAxios
      .onPatch("http://localhost:3000/store/purchase")
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.purchase(
      { commit: mockCommit, dispatch: mockDispatch },
      { title, price, quantity, productId, userId, email }
    );

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "buyProduct",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during return", async () => {
    const paymentId = "pay1";

    const mockCommit = jest.fn();

    // Mock axios PATCH request to simulate server error
    mockAxios
      .onPatch("http://localhost:3000/store/refund")
      .reply(500, { error: "Server Error" });

    // Call the action
    await actions.return({ commit: mockCommit }, { paymentId });

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "removeReturnedProduct",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });
});
