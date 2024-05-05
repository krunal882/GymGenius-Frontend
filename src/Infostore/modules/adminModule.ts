import axios, { AxiosResponse } from "axios";
import { TrackOpTypes } from "vue";
import { Commit, Dispatch } from "vuex";

interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  state: string;
}

interface State {
  user: User | null;
}

const state: State = {
  user: null, // Initialize user as null
};

const mutations = {
  setUsers(state: State, data: any) {
    state.user = data;
    console.log(state.user);
  },
};
const actions = {
  async getAllUser({ commit }: { commit: Commit }) {
    try {
      const url = "http://localhost:3000/auth/users";
      const response = await axios.get(url);
      const users = response.data;
      commit("setUsers", users);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
