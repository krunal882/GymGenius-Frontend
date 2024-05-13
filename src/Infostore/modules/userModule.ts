import axios, { AxiosResponse } from "axios";
import { Commit, GetterTree, ActionTree } from "vuex";
// import { toast } from "vue3-toastify";
import Cookies from "js-cookie";

interface State {
  userId: string;
  role: string;
  token: string;
  name: string; // Adjust the type according to your product object structure
  email: string;
  age: number;
  number: number;
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
  userId: "",
  role: "",
  token: "",
  name: "",
  email: "",
  age: 0,
  number: 0,
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
  setToken(state: State, data: any) {
    state.token = data.token;
    Cookies.set("token", data.token, { expires: 30 });
  },
  setUser(state: State, data: any) {
    state.name = data.name;
    state.email = data.email;
    state.age = data.age;
    state.number = data.number;
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
      console.log(error);
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
      commit("setToken", response.data);
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
      const config = createAxiosConfig();
      const url = "http://localhost:3000/auth/forgotPassword";
      const response = await axios.post(
        url,
        {
          email,
        },
        config
      );

      const subject = "Reset Password";
      const link = `http://localhost:8081/resetPassword/${response.data}`;
      const html = `Forgot your password? Click <a href="${link}">here</a> to reset your password.`;

      await axios.post(
        "http://localhost:3000/mailer/email",
        {
          recipients: email,
          subject,
          html,
        },
        config
      );

      // if (response.status === 201) {
      //   toast.success("Password reset email sent successfully");
      // } else {
      //   console.log("Error in sending mail");
      //   // Show an error message to the user if the request was not successful
      // }
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
      number,
      role,
    }: {
      email: Email;
      name: string;
      age: Number;
      id: string;
      number: Number;
      role: string;
    }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/auth/updateUser?id=${id}`;
      const response = await axios.patch(
        url,
        {
          email,
          name,
          age,
          number,
          role,
        },
        config
      );
    } catch (error) {
      console.log("error in update user information", error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
