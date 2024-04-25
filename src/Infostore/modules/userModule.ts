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
    // Adjust the type according to your product object structure
    state.user = data.data.user;
    state.token = data.data.token;
    document.cookie = `Authorization=Bearer ${data.data.token}`; // 604800 seconds = 7 days
  },
};
const actions = {
  async userLogin(
    { commit, dispatch }: { commit: Commit; dispatch: any },
    { email, password }: { email: Email; password: Password }
  ) {
    try {
      const url = "http://localhost:3000/auth/login";

      const response = await axios.post(url, {
        email,
        password,
      });
      console.log(response);
      const subject = "Account Login";
      const html = "<p>successfully loggedIn to your account</p>";
      commit("setUser", response);
      await axios.post("http://localhost:3000/mailer/email", {
        recipients: email,
        subject,
        html,
      });
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
    }: {
      email: Email;
      password: Password;
      name: Name;
      age: Age;
      confirmPassword: ConfirmPassword;
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
      });
      console.log(name, email, password, confirmPassword);
      commit("setUser", response);
      const subject = "Account Signup";
      const html = "<p>successfully created account</p>";
      console.log("hi");
      await axios.post("http://localhost:3000/mailer/email", {
        recipients: email,
        subject,
        html,
      });
    } catch (error) {
      console.log("error in signup", error);
    }
  },

  async forgetPassword({ email }: { email: Email }) {
    try {
      const url = "http://localhost:3000/auth/forgotPassword";

      const response = await axios.post(url, {
        email,
      });
      console.log(response);

      const subject = "Reset Password";
      const link = "";
      const html = "<p>Reset your password using following link</p>";
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
