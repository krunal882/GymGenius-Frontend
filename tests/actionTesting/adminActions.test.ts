import { actions } from "../../src/Infostore/modules/adminModule"; // Adjust import path as per your project
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification"; // Adjust import path as per your setup

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("adminActions", () => {
  let mockAxios;
  let mockToast;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    mockToast = {
      success: jest.fn(),
      error: jest.fn(),
    };

    // Ensure useToast returns the mock implementation
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  afterEach(() => {
    mockAxios.restore(); // Reset axios mock adapter after each test
    jest.clearAllMocks(); // Clear all mock calls after each test
  });

  it("adds a new user and commits mutation", async () => {
    const newUser = {
      _id: "1",
      name: "New User",
      email: "newuser@example.com",
      age: 25,
      number: "1234567890",
      role: "admin",
      state: "active",
    };

    const mockCommit = jest.fn();

    // Mock Axios POST request
    mockAxios.onPost("http://localhost:3000/auth/addUser").reply(201, newUser);

    // Call the action
    await actions.userAdd({ commit: mockCommit }, { user: newUser });

    // Assert that the correct mutations were called
    expect(mockCommit).toHaveBeenCalledWith("addUser", newUser);
  });

  it("deletes a user and commits mutation for user role without master", async () => {
    const userId = "12345";
    const role = "user";
    const master = undefined;

    const mockCommit = jest.fn();

    // Mock Axios DELETE request
    mockAxios
      .onDelete(
        `http://localhost:3000/auth/deleteUser?id=${userId}&role=${role}`
      )
      .reply(200, "User deleted successfully");

    // Call the action
    await actions.userDelete(
      { commit: mockCommit },
      { id: userId, role, master }
    );

    // Assert that the correct mutations were called
    expect(mockCommit).toHaveBeenCalledWith("deleteUser", userId);
    expect(mockCommit).toHaveBeenCalledWith("setUserDeleted", true);
  });

  it("handles server error gracefully during user add", async () => {
    const newUser = {
      _id: "1",
      name: "New User",
      email: "newuser@example.com",
      age: 25,
      number: "1234567890",
      role: "admin",
      state: "active",
    };

    const mockCommit = jest.fn();

    // Mock Axios POST request to simulate server error
    mockAxios
      .onPost("http://localhost:3000/auth/addUser")
      .reply(500, {
        error: "An error occurred on the server. Please try again later.",
      });

    // Call the action
    await actions.userAdd({ commit: mockCommit }, { user: newUser });

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith("addUser", expect.anything());
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });

  it("handles server error gracefully during user delete", async () => {
    const userId = "12345";
    const role = "user";
    const master = undefined;

    const mockCommit = jest.fn();

    // Mock Axios DELETE request to simulate server error
    mockAxios
      .onDelete(
        `http://localhost:3000/auth/deleteUser?id=${userId}&role=${role}`
      )
      .reply(500, {
        error: "An error occurred on the server. Please try again later.",
      });

    // Call the action
    await actions.userDelete(
      { commit: mockCommit },
      { id: userId, role, master }
    );

    // Assert that the error handling function was called
    expect(mockCommit).not.toHaveBeenCalledWith(
      "deleteUser",
      expect.anything()
    );
    expect(mockToast.error).toHaveBeenCalledWith(
      "An error occurred on the server. Please try again later."
    );
  });
});
