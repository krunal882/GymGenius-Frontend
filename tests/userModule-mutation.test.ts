import { mutations, User, State } from "../src/Infostore/modules/userModule";

// Mock global object to simulate browser environment
describe("User Module Mutations", () => {
  let state: State;

  beforeEach(() => {
    state = {
      userId: "",
      role: "",
      token: "",
      name: "",
      email: "",
      age: 0,
      number: "",
      userAvatarUrl: "",
    };
  });
  it("setUser mutation sets the user data in state", () => {
    const userData: User = {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
      number: "1234567890",
      role: "user",
      password: "password",
      confirmPassword: "password",
      state: "active",
      src: "avatar_url",
    };

    mutations.setUser(state, userData);

    expect(state.name).toBe(userData.name);
    expect(state.email).toBe(userData.email);
    expect(state.age).toBe(userData.age);
    expect(state.number).toBe(userData.number);
    expect(state.userAvatarUrl).toBe(userData.src);
  });

  it("setUserAvatarUrl mutation sets the userAvatarUrl in state", () => {
    const avatarUrl = "new_avatar_url";

    mutations.setUserAvatarUrl(state, avatarUrl);

    expect(state.userAvatarUrl).toBe(avatarUrl);
  });
});
