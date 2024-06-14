import { actions, User } from "../../src/Infostore/modules/userModule";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useToast } from "vue-toast-notification";

jest.mock("vue-toast-notification", () => ({
  useToast: jest.fn(),
}));

describe("userModule actions", () => {
  let mockAxios: MockAdapter;
  let mockToast: any;

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

  it("fetchUser commits data correctly", async () => {
    const commit = jest.fn();
    const userId = "6603b05810e52067a82c40dc";

    const mockUser: User = {
      _id: userId,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
      number: "1234567890",
      role: "user",
      password: "password123",
      confirmPassword: "password123",
      state: "active",
      src: "someUrl",
    };

    mockAxios
      .onGet(`http://localhost:3000/auth/filtered?_id=${userId}`)
      .reply(200, [mockUser]);

    await actions.fetchUser({ commit }, { id: userId });

    expect(commit).toHaveBeenCalledWith("setUser", mockUser);
    expect(mockToast.error).not.toHaveBeenCalled();
  });
  it("forgotPassword triggers success toast", async () => {
    const commit = jest.fn();
    const email = "krunal@gmail.com";

    mockAxios.onPost("http://localhost:3000/auth/forgotPassword").reply(201);

    await actions.forgotPassword({ commit }, { email });

    expect(mockToast.success).toHaveBeenCalledWith(
      "password reset link sent to your mail successfully"
    );
  });

  it("resetPassword triggers success toast", async () => {
    const commit = jest.fn();
    const newPassword = "newPassword123";
    const newConfirmPassword = "newPassword123";
    const resetPasswordToken = "resetToken";

    mockAxios
      .onPost("http://localhost:3000/auth/resetPassword")
      .reply(201, "Password reset successful");

    await actions.resetPassword(
      {
        commit,
      },
      {
        newPassword,
        newConfirmPassword,
        resetPasswordToken,
      }
    );

    expect(mockToast.success).toHaveBeenCalledWith("Password reset successful");
  });

  it("userUpdate commits data correctly", async () => {
    const commit = jest.fn();
    const updatedUser: User = {
      _id: "6603b05810e52067a82c40dc",
      name: "John Doe",
      email: "john.doe@example.com",
      age: 31,
      number: "0987654321",
      role: "user",
      password: "password123",
      confirmPassword: "password123",
      state: "active",
      src: "someUrl",
    };

    mockAxios
      .onPatch(`http://localhost:3000/auth/updateUser?id=${updatedUser._id}`)
      .reply(200, updatedUser);

    await actions.userUpdate({ commit }, { updatedUser });

    expect(commit).toHaveBeenCalledWith("setUser", updatedUser);
    expect(mockToast.success).toHaveBeenCalledWith("User updated successfully");
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("addImage commits avatar URL correctly", async () => {
    const commit = jest.fn();
    const userId = "6603b05810e52067a82c40dc";
    const imgUrl = "newImageUrl";

    mockAxios.onPost("http://localhost:3000/auth/upload").reply(200, imgUrl);

    await actions.addImage({ commit }, { userId, imgUrl });

    expect(commit).toHaveBeenCalledWith("setUserAvatarUrl", imgUrl);
    expect(mockToast.success).toHaveBeenCalledWith("Profile picture uploaded");
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("getContact sends email and triggers success toast", async () => {
    const commit = jest.fn();
    const fullName = "John Doe";
    const email = "john.doe@example.com";
    const phoneNumber = "1234567890";
    const subject = "Contact Request";
    const message = "This is a test message.";

    mockAxios.onPost("http://localhost:3000/mailer/email").reply(201);

    await actions.getContact(
      {
        commit,
      },
      {
        fullName,
        email,
        phoneNumber,
        subject,
        message,
      }
    );

    expect(mockToast.success).toHaveBeenCalledWith(
      "Thank you for your message! We'll get back to you shortly."
    );
    expect(mockToast.error).not.toHaveBeenCalled();
  });

  it("changePassword triggers success toast", async () => {
    const commit = jest.fn();
    const oldPassword = "oldPassword123";
    const newPassword = "newPassword123";
    const userId = "6603b05810e52067a82c40dc";

    mockAxios
      .onPatch("http://localhost:3000/auth/change-password")
      .reply(200, "Password changed successfully");

    await actions.changePassword(
      {
        commit,
      },
      {
        oldPassword,
        newPassword,
        userId,
      }
    );

    expect(mockToast.success).toHaveBeenCalledWith(
      "Password changed successfully"
    );
    expect(mockToast.error).not.toHaveBeenCalled();
  });
});
