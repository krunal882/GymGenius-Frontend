import axios, { AxiosResponse } from "axios";
import { Commit } from "vuex";

interface Exercise {
  _id: string;
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string;
  secondaryMuscles: string;
  instructions: string;
  category: string;
}

interface State {
  exercises: any[]; // Adjust the type according to your exercise object structure
}

interface FilteredFilters {
  [key: string]: string | string[];
}

const state: State = {
  exercises: [],
};

const mutations = {
  setExercises(state: State, exercises: any[]) {
    // Adjust the type according to your exercise object structure
    state.exercises = exercises;
  },
};

const actions = {
  async fetchExercises(
    { commit }: { commit: Commit },
    filteredFilters: FilteredFilters
  ) {
    try {
      // console.log(filteredFilters);
      let url = "http://localhost:3000/exercises";
      if (filteredFilters && Object.keys(filteredFilters).length > 0) {
        // Construct the query parameters from filteredFilters object
        const queryParams = Object.entries(filteredFilters)
          .map(([key, value]) => {
            // Check if the value is an array
            if (Array.isArray(value)) {
              // If it's an array, create separate parameters for each value
              return value
                .map((v) => `${key}=${encodeURIComponent(v)}`)
                .join("&");
            } else {
              // Otherwise, create a single parameter
              return `${key}=${encodeURIComponent(value)}`;
            }
          })
          .join("&");

        url += `/filtered?${queryParams}`;
      } else {
        url += "?limit=10";
      }

      const response: AxiosResponse = await axios.get(url);
      console.log(response.data);
      commit("setExercises", response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  },
  async editExercise(
    { commit }: { commit: Commit },
    { id, exercise }: { id: string; exercise: Exercise }
  ) {
    console.log(exercise);
    const url = `http://localhost:3000/exercises/updateExercise?id=${id}`;
    const response = await axios.patch(url, exercise);
    console.log(response.data);
  },
  async removeExercise({ commit }: { commit: Commit }, { id }: { id: string }) {
    console.log(id);
    const url = `http://localhost:3000/exercises/deleteExercise?id=${id}`;
    const response = await axios.delete(url);
    console.log(response.data);
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
