// this vuex store is for exercise actions
import axios, { AxiosResponse, AxiosError } from "axios";
import { Commit } from "vuex";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

// interface for the exercise
export interface Exercise {
  _id: string;
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  cloudImg: string;
}

// state interface
interface State {
  exercises: Exercise[];
  exerciseSearch: Exercise[];
  exerciseDetail: Exercise;
}

interface FilteredFilters {
  [key: string]: string | string[];
}

//store state
const state: State = {
  exercises: [],
  exerciseSearch: [],
  exerciseDetail: null,
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
  setExerciseDetail(state: State, exercise: Exercise) {
    state.exerciseDetail = exercise;
  },
};

// Vuex actions for asynchronously handling and committing state changes.
const actions = {
  // action to fetch exercises
  async fetchExercises(
    { commit }: { commit: Commit },
    {
      filteredFilters,
      page,
      limit,
      id,
    }: {
      filteredFilters: FilteredFilters;
      page: number;
      limit: number;
      id: string;
    }
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
      } else if (id) {
        url += `/filtered?_id=${id}`;
      } else {
        url += `?page=${page}&limit=${limit}`;
      }

      const response: AxiosResponse = await axios.get(url, config);

      if (id) {
        commit("setExerciseDetail", response.data);
      }
      if (page === 1) {
        commit("setExercises", response.data);
      } else {
        commit("appendExercises", response.data);
      }
      return response.data;
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to search specific exercise
  async searchExercise({ commit }: { commit: Commit }, name: string) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/exercises/filtered?name=${name}`;
      const response = await axios.get(url, config);
      commit("setExerciseSearch", response.data);
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to add new exercise
  async addExercise(
    { commit }: { commit: Commit },
    { exercise }: { exercise: Exercise }
  ) {
    try {
      const config = createAxiosConfig();
      const url = "http://localhost:3000/exercises/addExercise";
      const response = await axios.post(url, exercise, config);
      if (response.status === 201) {
        useToast().success("New Exercise added successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to edit existing exercise
  async editExercise(
    { commit }: { commit: Commit },
    { exercise }: { exercise: Exercise }
  ) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/exercises/updateExercise?id=${exercise._id}`;
      const response = await axios.patch(url, exercise, config);
      if (response.status === 200) {
        commit("editExercise", exercise);
        useToast().success(" Exercise updated successfully");
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  // action to remove exercise
  async removeExercise({ commit }: { commit: Commit }, { id }: { id: string }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/exercises/deleteExercise?id=${id}`;
      const response = await axios.delete(url, config);
      if (response.status === 200) {
        commit("removeExercise", id);
        useToast().success(" Exercise removed successfully");
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
