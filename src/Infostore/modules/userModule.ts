import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree, ActionTree } from "vuex";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import Cookies from "js-cookie";

interface State {
  userId: string;
  role: string;
  token: string;
  name: string;
  email: string;
  age: number;
  number: string;
  userAvatarUrl: string;
}

interface User {
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
  setUserDeleted(state, isDeleted) {
    state.userId = null;
    state.userDeleted = isDeleted;
  },
  setUserAvatarUrl(state, url) {
    state.userAvatarUrl = url;
  },
};

const actions = {
  async fetchUser({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/auth/filtered?id=${id}`;
      const response = await axios.get(url, config);
      commit("setUser", response.data[0]);
    } catch (error) {
      useToast().error("Error in fetching users");
    }
  },

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
      const html = "<p>successfully loggedIn to your account</p>";
      const token = response.data.token;
      if (response.status === 201) {
        useToast().success("Login successful! Welcome back.");
      }
      commit("setToken", response.data);
      // await axios.post("http://localhost:3000/mailer/email", {
      //   recipients: email,
      //   subject,
      //   html,
      // });
    } catch (error) {
      useToast().error("Error in login");
    }
  },

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
      commit("setToken", response.data);
      if (response.status === 201) {
        useToast().success("Account created successfully! Welcome aboard.");
      }
      const subject = "Account Signup";
      const html = "<p>successfully created account</p>";
      // await axios.post("http://localhost:3000/mailer/email", {
      //   recipients: email,
      //   subject,
      //   html,
      // });
    } catch (error) {
      useToast().error("Error in signup");
    }
  },

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
      }
    } catch (error) {
      useToast().error("Error in sending mail");
    }
  },

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
        useToast().success("password reset successful");
      }
    } catch (error) {
      useToast().error("Error in reset password");
    }
  },

  async userAdd({ commit }: { commit: Commit }, { user }: { user: User }) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/addUser";
      const response = await axios.post(url, user, config);
      if (response.status === 201) {
        useToast().success("New user added successfully");
      }
    } catch (error) {
      useToast().error("Error in user creation");
    }
  },

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
        useToast().success(" User updated successfully");
      }
    } catch (error) {
      useToast().error("Error in update user information");
    }
  },

  async userDelete(
    { commit }: { commit: Commit },
    { id, role, master }: { id: string; role: string; master: string }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/auth/deleteUser?id=${id}&role=${role}`;
      const response = await axios.delete(url, config);
      if (response.status === 200 && role === "user" && master === "") {
        Cookies.remove("token");
        if (response.status === 200) {
          useToast().success(" User deleted successfully");
        }
        commit("setUserDeleted", true);
      }
    } catch (error) {
      useToast().error("Error in user delete");
    }
  },
  async addImage(
    { commit }: { commit: Commit },
    { userId, imgUrl }: { userId: string; imgUrl: string }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/upload";
      const response = await axios.post(url, { userId, imgUrl }, config);
      commit("setUserAvatarUrl", response.data);
    } catch (error) {
      console.log(error);
    }
  },

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

      const response = await axios.post(
        "http://localhost:3000/mailer/email",
        {
          recipients: "krunalvekariya254@gmail.com",
          subject,
          html,
        },
        config
      );
      if (response.status === 201) {
        useToast().success(
          "Thank you for your message! We'll get back to you shortly."
        );
      }
    } catch (error) {
      useToast().error("Error in sending connect request");
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
