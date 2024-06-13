// this vuex store is for user actions
import axios, { AxiosError } from "axios";
import { Commit } from "vuex";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Cookies from "js-cookie";

//interface for the user
export interface State {
  userId: string;
  role: string;
  token: string;
  name: string;
  email: string;
  age: number;
  number: string;
  userAvatarUrl: string;
}

// interface for creating new user and editing user
export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  number: string;
  role: string;
  password: string;
  confirmPassword: string;
  state: string;
  src: string;
}

// interface for the signup
interface signup {
  token: string;
  user: User;
}

interface Email {
  [key: string]: string;
}

interface Password {
  [key: string]: string;
}

interface ConfirmPassword {
  [key: string]: string;
}

interface Name {
  [key: string]: string;
}

interface Age {
  [key: string]: string;
}

// store state
const state: State = {
  userId: "",
  role: "",
  token: "",
  name: "",
  email: "",
  age: 0,
  number: "",
  userAvatarUrl: "",
};

// getting token from the cookie
const createAxiosConfig = () => {
  const token = Cookies.get("token");
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// server side error handling
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

// mutations for the state changes
export const mutations = {
  setToken(state: State, data: signup) {
    state.token = data.token;
    Cookies.set("token", data.token, { expires: 30 });
  },
  setUser(state: State, data: User) {
    state.name = data.name;
    state.email = data.email;
    state.age = data.age;
    state.number = data.number;
    state.userAvatarUrl = data.src;
  },

  setUserAvatarUrl(state, url) {
    state.userAvatarUrl = url;
  },
};

// Vuex actions for asynchronously handling and committing state changes.
const actions = {
  // action to fetch the user
  async fetchUser({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/auth/filtered?_id=${id}`;
      const response = await axios.get(url, config);
      if (response.data.length > 0) {
        commit("setUser", response.data[0]);
      } else {
        useToast().error("User not found.");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for user login
  async userLogin(
    { commit }: { commit: Commit },
    { email, password }: { email: Email; password: Password }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/login";

      const response = await axios.post(
        url,
        {
          email,
          password,
        },
        config
      );
      const subject = "Account Login";
      const html = "<p>login activity detected in your account</p>";
      const token = response.data.token;
      if (response.status === 201) {
        useToast().success("Login successful! Welcome back.");
        commit("setToken", response.data);
        axios.post("http://localhost:3000/mailer/email", {
          recipients: email,
          subject,
          html,
        });
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for the user signup
  async userSignup(
    { commit }: { commit: Commit },
    {
      email,
      password,
      name,
      age,
      confirmPassword,
      number,
    }: {
      email: Email;
      password: Password;
      name: Name;
      age: Age;
      confirmPassword: ConfirmPassword;
      number: string;
    }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/signup";
      const response = await axios.post(
        url,
        {
          name,
          email,
          password,
          confirmPassword,
          age,
          number,
        },
        config
      );
      if (response.status === 201) {
        commit("setToken", response.data);
        useToast().success("Account created successfully! Welcome aboard.");
      }
      const subject = "Account Signup";
      const html = "<p>successfully created account</p>";
      axios.post("http://localhost:3000/mailer/email", {
        recipients: email,
        subject,
        html,
      });
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for forgot password operation
  async forgotPassword(
    { commit }: { commit: Commit },
    { email }: { email: string }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/forgotPassword";
      const response = await axios.post(
        url,
        {
          email,
        },
        config
      );
      if (response.status === 201) {
        useToast().success(
          "password reset link sent to your mail successfully"
        );
        window.location.href = "/";
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for the reset password operation
  async resetPassword(
    { commit }: { commit: Commit },
    {
      newPassword,
      newConfirmPassword,
      resetPasswordToken,
    }: {
      newPassword: string;
      newConfirmPassword: string;
      resetPasswordToken: string;
    }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/resetPassword";

      const response = await axios.post(
        url,
        {
          newPassword,
          newConfirmPassword,
          resetPasswordToken,
        },
        config
      );
      if (response.status === 201) {
        useToast().success(response.data);
        window.location.href = "/authentication";
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for the user update
  async userUpdate(
    { commit }: { commit: Commit },
    {
      updatedUser,
    }: {
      updatedUser: User;
    }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/auth/updateUser?id=${updatedUser._id}`;
      const response = await axios.patch(url, updatedUser, config);
      if (response.status === 200) {
        commit("setUser", updatedUser);
        useToast().success("User updated successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for the profile image upload
  async addImage(
    { commit }: { commit: Commit },
    { userId, imgUrl }: { userId: string; imgUrl: string }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/upload";
      const response = await axios.post(url, { userId, imgUrl }, config);
      commit("setUserAvatarUrl", response.data);
      useToast().success("Profile picture uploaded");
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for the user query form
  async getContact(
    { commit }: { commit: Commit },
    { fullName, email, phoneNumber, subject, message }
  ) {
    try {
      const config = createAxiosConfig();
      const html = ` <html>
    <body>
      <h1>Contact Request</h1>
      <p>A new contact request has been received with the following details:</p>
      <table border="1" cellspacing="0" cellpadding="5">
      <tr>
      <td><strong>Subject:</strong></td>
      <td>${subject}</td>
    </tr>
        <tr>
          <td><strong>Name:</strong></td>
          <td>${fullName}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${email}</td>
        </tr>
        <tr>
          <td><strong>Phone Number:</strong></td>
          <td>${phoneNumber}</td>
        </tr>
        <tr>
          <td><strong>Message:</strong></td>
          <td>${message}</td>
        </tr>
      </table>
    </body>
  </html>`;

      const response = await axios.post("http://localhost:3000/mailer/email", {
        recipients: "krunalvekariya254@gmail.com",
        subject,
        html,
      });
      if (response.status === 201) {
        useToast().success(
          "Thank you for your message! We'll get back to you shortly."
        );
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action for the change password operation
  async changePassword(
    { commit }: { commit: Commit },
    {
      oldPassword,
      newPassword,
      userId,
    }: {
      oldPassword: string;
      newPassword: string;
      userId: string;
    }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/change-password";
      const response = await axios.patch(
        url,
        { oldPassword, newPassword, userId },
        config
      );
      if (response.status === 200) {
        useToast().success(response.data);
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
