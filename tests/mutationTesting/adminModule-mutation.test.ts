import {
  mutations,
  State,
  User,
  OrderData,
} from "../../src/Infostore/modules/adminModule";

describe("admin module Mutations", () => {
  let state: State;
  const user1: User = {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    number: "1234567890",
    role: "user",
    state: "active",
  };
  const user2: User = {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
    number: "9876543210",
    role: "admin",
    state: "inactive",
  };
  const orderData: OrderData = {
    userId: "1",
    productInfo: [
      {
        _id: "1",
        category: "Electronics",
        src: "/images/product1.jpg",
        title: "Product 1",
        price: 100,
        original_price: "120",
        off: "20",
        state: "active",
      },
    ],
  };

  beforeEach(() => {
    state = {
      userInfo: [],
      productData: [],
      total: 0,
      userDeleted: false,
    };
  });

  it("setUsers mutation sets the state.userInfo correctly", () => {
    mutations.setUsers(state, [user1, user2]);
    expect(state.userInfo).toEqual([user1, user2]);
  });

  it("setOrders mutation sets the state.productData correctly", () => {
    mutations.setOrders(state, [orderData]);
    expect(state.productData).toEqual([orderData]);
  });

  it("setTotalItems mutation sets the state.total correctly", () => {
    mutations.setTotalItems(state, 10);
    expect(state.total).toEqual(10);
  });

  it("addUser mutation adds a user to state.userInfo correctly", () => {
    mutations.addUser(state, user1);
    expect(state.userInfo).toEqual([user1]);
  });

  it("deleteUser mutation deletes a user from state.userInfo correctly", () => {
    // First, add some users to state
    state.userInfo = [user1, user2];
    mutations.deleteUser(state, "1");
    expect(state.userInfo).toEqual([user2]);
  });

  it("setUserDeleted mutation sets the state.userDeleted correctly", () => {
    mutations.setUserDeleted(state, true);
    expect(state.userDeleted).toEqual(true);
  });
});
