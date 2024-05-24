import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

interface Exercise {
  _id: string;
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: [];
  secondaryMuscles: [];
  instructions: [];
  category: string;
  cloudImg: string;
}

interface State {
  exercises: Exercise[];
  exerciseSearch: Exercise[];
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  exercises: [],
  exerciseSearch: [],
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
  setExercises(state: State, exercises: Exercise[]) {
    state.exercises = exercises;
  },
  setExerciseSearch(state: State, exercises: Exercise[]) {
    state.exerciseSearch = exercises;
  },
  appendExercises(state: State, exercises: Exercise[]) {
    state.exercises = [...state.exercises, ...exercises];
  },
  editExercise(state: State, exercise: Exercise) {
    const index = state.exerciseSearch.findIndex(
      (exercise) => exercise._id === exercise._id
    );
    if (index !== -1) {
      state.exerciseSearch[index] = exercise;
    }
  },
  removeExercise(state: State, id: string) {
    state.exerciseSearch = state.exerciseSearch.filter(
      (item) => item._id !== id
    );
  },
};

const actions = {
  async fetchExercises(
    { commit }: { commit: Commit },
    {
      filteredFilters,
      page,
      limit,
    }: { filteredFilters: FilteredFilters; page: number; limit: number }
  ) {
    try {
      const config = createAxiosConfig();
      let url = "http://localhost:3000/exercises";
      if (filteredFilters && Object.keys(filteredFilters).length > 0) {
        const queryParams = Object.entries(filteredFilters)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return value
                .map((v) => `${key}=${encodeURIComponent(v)}`)
                .join("&");
            } else {
              return `${key}=${encodeURIComponent(value)}`;
            }
          })
          .join("&");
        url += `/filtered?${queryParams}&page=${page}&limit=${limit}`;
      } else {
        url += `?page=${page}&limit=${limit}`;
      }

      const response: AxiosResponse = await axios.get(url, config);
      if (page === 1) {
        commit("setExercises", response.data);
      } else {
        commit("appendExercises", response.data);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  },
  async searchExercise({ commit }: { commit: Commit }, name: string) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/exercises/filtered?name=${name}`;
    const response = await axios.get(url, config);
    commit("setExerciseSearch", response.data);
  },

  async addExercise(
    { commit }: { commit: Commit },
    { exercise }: { exercise: Exercise }
  ) {
    console.log(exercise);
    const config = createAxiosConfig();
    const url = "http://localhost:3000/exercises/addExercise";
    const response = await axios.post(url, exercise, config);
    if (response.status === 201) {
      useToast().success("New Exercise added successfully");
    }
  },

  async editExercise(
    { commit }: { commit: Commit },
    { exercise }: { exercise: Exercise }
  ) {
    console.log(exercise);
    const config = createAxiosConfig();
    const url = `http://localhost:3000/exercises/updateExercise?id=${exercise._id}`;
    const response = await axios.patch(url, exercise, config);
    if (response.status === 200) {
      commit("editExercise", exercise);
      useToast().success(" Exercise updated successfully");
    }
  },
  async removeExercise({ commit }: { commit: Commit }, { id }: { id: string }) {
    const config = createAxiosConfig();
    const url = `http://localhost:3000/exercises/deleteExercise?id=${id}`;
    const response = await axios.delete(url, config);
    if (response.status === 200) {
      commit("removeExercise", id);
      useToast().success(" Exercise removed successfully");
    }
  },
};

const getters = {
  // Getters to access state.exercises
};

export default {
  state,
  mutations,
  actions,
  getters,
};
