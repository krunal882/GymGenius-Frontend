import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree, ActionTree } from "vuex";

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
    console.log(data.data.user, data.data.token);
    document.cookie = `Authorization=Bearer ${data.data.token}`; // 604800 seconds = 7 days
  },
};
const actions = {
  async userLogin(
    { commit }: { commit: Commit },
    { email, password }: { email: Email; password: Password }
  ) {
    try {
      const url = "http://localhost:3000/auth/login";

      const response = await axios.post(url, {
        email: email,
        password: password,
      });
      console.log(response);

      commit("setUser", response);
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
      console.log(response);
      commit("setUser", response);
    } catch (error) {
      console.log("error in signup", error);
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
