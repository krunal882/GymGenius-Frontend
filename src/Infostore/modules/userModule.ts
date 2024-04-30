import ForgotPassword from "@/pages/userAuth/ForgotPassword.vue";
import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree, ActionTree } from "vuex";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface State {
  user: object;
  token: string; // Adjust the type according to your product object structure
}

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   age: number;
//   role: string;
//   password: string;
//   confirmPassword: string;
//   state: string;
//   __v: number;
// }

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
  user: {},
  token: "",
};

const mutations = {
  setUser(state: State, data: any) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (
      userInfo &&
      userInfo.userModule &&
      userInfo.userModule.user &&
      userInfo.userModule.user._id &&
      data.user &&
      data.user._id &&
      userInfo.userModule.user._id === data.user._id
    ) {
      return;
    } else {
      console.log(data.user);
      state.user = data.user;
      state.token = data.token;
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    document.cookie = `Authorization=Bearer ${data.token}`; // 604800 seconds = 7 days
  },
};

const actions = {
  async userLogin(
    { commit }: { commit: Commit },
    { email, password }: { email: Email; password: Password }
  ) {
    try {
      console.log(email);
      const url = "http://localhost:3000/auth/login";

      const response = await axios.post(url, {
        email,
        password,
      });
      console.log(response.data);
      const subject = "Account Login";
      const html = "<p>successfully loggedIn to your account</p>";
      commit("setUser", response.data);
      // await axios.post("http://localhost:3000/mailer/email", {
      //   recipients: email,
      //   subject,
      //   html,
      // });
    } catch (error) {
      console.log("Error in login", error);
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
    console.log(name, email, password, name, age, confirmPassword);
    try {
      const url = "http://localhost:3000/auth/signup";
      console.log(url);
      const response = await axios.post(url, {
        name,
        email,
        password,
        confirmPassword,
        age,
        number,
      });
      console.log(response);
      commit("setUser", response.data);
      const subject = "Account Signup";
      const html = "<p>successfully created account</p>";
      // await axios.post("http://localhost:3000/mailer/email", {
      //   recipients: email,
      //   subject,
      //   html,
      // });
    } catch (error) {
      console.log("error in signup", error);
    }
  },

  async forgotPassword(
    { commit }: { commit: Commit },
    { email }: { email: string }
  ) {
    try {
      const url = "http://localhost:3000/auth/forgotPassword";
      console.log(email);
      const response = await axios.post(url, {
        email,
      });
      console.log(response.data);

      const subject = "Reset Password";
      const link = `http://localhost:8081/resetPassword/${response.data}`;
      const html = `Forgot your password? Click <a href="${link}">here</a> to reset your password.`;

      await axios.post("http://localhost:3000/mailer/email", {
        recipients: email,
        subject,
        html,
      });

      if (response.status === 201) {
        toast.success("Password reset email sent successfully");
      } else {
        console.log("Error in sending mail");
        // Show an error message to the user if the request was not successful
      }
    } catch (error) {
      console.log("Error in sending mail");
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
      const url = "http://localhost:3000/auth/resetPassword";

      console.log(newPassword, newConfirmPassword);
      const response = await axios.post(url, {
        newPassword,
        newConfirmPassword,
        resetPasswordToken,
      });
      console.log(response);
    } catch (error) {
      console.log("Error in Resetting password", error);
    }
  },
  async userUpdate(
    { commit }: { commit: Commit },
    {
      email,
      name,
      age,
      id,
    }: { email: Email; name: string; age: Number; id: string }
  ) {
    try {
      const url = `http://localhost:3000/auth/updateUser?id=${id}`;
      console.log(url);
      const response = await axios.patch(url, {
        email,
        name,
        age,
      });
      console.log(age);
    } catch (error) {
      console.log("error in update user information", error);
    }
  },
};

const getters: GetterTree<State, any> = {
  getProduct(state: State): any {
    return state.user;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
