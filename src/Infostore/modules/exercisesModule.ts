import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

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
}

interface State {
  exercises: any[];
  exerciseSearch: any[];
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  exercises: [],
  exerciseSearch: [],
};

const mutations = {
  setExercises(state: State, exercises: any[]) {
    state.exercises = exercises;
  },
  setExerciseSearch(state: State, exercises: any[]) {
    state.exerciseSearch = exercises;
  },
};

const actions = {
  async fetchExercises(
    { commit }: { commit: Commit },
    filteredFilters: FilteredFilters
  ) {
    try {
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

        url += `/filtered?${queryParams}`;
      } else {
        url += "?limit=10";
      }

      const response: AxiosResponse = await axios.get(url);
      commit("setExercises", response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  },
  async searchExercise({ commit }: { commit: Commit }, name: string) {
    const url = `http://localhost:3000/exercises/filtered?name=${name}`;
    const response = await axios.get(url);
    commit("setExerciseSearch", response.data);
  },

  async addExercise(
    { commit }: { commit: Commit },
    { exercise }: { exercise: Exercise }
  ) {
    console.log(exercise);
    const url = "http://localhost:3000/exercises/addExercise";
    const response = await axios.post(url, exercise);
    console.log(response);
  },

  async editExercise(
    { commit }: { commit: Commit },
    { exercise }: { exercise: Exercise }
  ) {
    const url = `http://localhost:3000/exercises/updateExercise?id=${exercise._id}`;
    const response = await axios.patch(url, exercise);
  },
  async removeExercise({ commit }: { commit: Commit }, { id }: { id: string }) {
    const url = `http://localhost:3000/exercises/deleteExercise?id=${id}`;
    const response = await axios.delete(url);
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
