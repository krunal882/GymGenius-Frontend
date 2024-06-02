// this vuex store is for item bookmark actions

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { Commit, Dispatch } from "vuex";

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

const state = {
  exercise: [],
  nutrition: [],
  yoga: [],
  diet: [],
};

// mutations for the state changes
const mutations = {
  setBookmarked(state, payload) {
    switch (payload.category) {
      case "exercise":
        state.exercise = payload.data;
        break;
      case "nutrition":
        state.nutrition = payload.data;
        break;
      case "yoga":
        state.yoga = payload.data;
        break;
      case "diet":
        state.diet = payload.data;
        break;
      default:
        console.error("Invalid category:", payload.category);
    }
  },
  bookmarkItem(state, payload) {
    const category = payload.itemType;
    const item = payload.item;
    switch (category) {
      case "exercise":
        state.exercise.push(item);
        break;
      case "nutrition":
        state.nutrition.push(item);
        break;
      case "yoga":
        state.yoga.push(item);
        break;
      case "diet":
        state.diet.push(item);
        break;
    }
  },
  undoBookmark(state, payload) {
    const category = payload.itemType;
    const itemId = payload.itemId;
    switch (category) {
      case "exercise":
        state.exercise = state.exercise.filter((item) => item._id !== itemId);
        break;
      case "nutrition":
        state.nutrition = state.nutrition.filter((item) => item._id !== itemId);
        break;
      case "yoga":
        state.yoga = state.yoga.filter((item) => item._id !== itemId);
        break;
      case "diet":
        state.diet = state.diet.filter((item) => item._id !== itemId);
        break;
    }
  },
};

// Vuex actions for asynchronously handling and committing state changes.
const actions = {
  // action to get all users bookmarked item
  async fetchBookmarked({ commit }, { userId }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/bookmark/getBookmarked?userId=${userId}`;
      const response = await axios.get(url, config);
      const exerciseItems = [];
      const yogaItems = [];
      const dietItems = [];
      const nutritionItems = [];
      if (response.data.length > 0) {
        const itemId = response.data[0].item;
        const exerciseIds = itemId.exercise;
        const yogaIds = itemId.yoga;
        const nutritionIds = itemId.nutrition;
        const dietPlanIds = itemId.diet;

        //Fetch and accumulate exercises
        if (exerciseIds && exerciseIds.length !== 0) {
          let exerciseUrl = "http://localhost:3000/exercises/filtered?";
          exerciseIds.forEach((id: string) => {
            exerciseUrl += `_id=${id}&`;
          });
          if (exerciseUrl.endsWith("&")) {
            exerciseUrl = exerciseUrl.slice(0, -1);
          }
          const exercisesResponse = await axios.get(exerciseUrl, config);
          exerciseItems.push(...exercisesResponse.data);
          commit("setBookmarked", {
            category: "exercise",
            data: exerciseItems,
          });
        }

        // Fetch and accumulate yoga poses
        if (yogaIds && yogaIds.length !== 0) {
          let yogaUrl = "http://localhost:3000/yoga-poses/filtered?";
          yogaIds.forEach((id: string) => {
            yogaUrl += `yogaId=${id}&`;
          });
          if (yogaUrl.endsWith("&")) {
            yogaUrl = yogaUrl.slice(0, -1);
          }
          const yogaResponse = await axios.get(yogaUrl, config);
          yogaItems.push(...yogaResponse.data);
          commit("setBookmarked", { category: "yoga", data: yogaItems });
        }

        // Fetch and accumulate nutrition items
        if (nutritionIds && nutritionIds.length !== 0) {
          let nutritionUrl = "http://localhost:3000/foodNutrition/filtered?";
          nutritionIds.forEach((id: string) => {
            nutritionUrl += `_id=${id}&`;
          });
          if (nutritionUrl.endsWith("&")) {
            nutritionUrl = nutritionUrl.slice(0, -1);
          }
          const nutritionResponse = await axios.get(nutritionUrl, config);
          nutritionItems.push(...nutritionResponse.data);
          commit("setBookmarked", {
            category: "nutrition",
            data: nutritionItems,
          });
        }

        // Fetch and accumulate diet plans
        if (dietPlanIds && dietPlanIds.length !== 0) {
          let dietPlanUrl = "http://localhost:3000/diet-plans/filter?";
          dietPlanIds.forEach((id: string) => {
            dietPlanUrl += `dietId=${id}&`;
          });
          if (dietPlanUrl.endsWith("&")) {
            dietPlanUrl = dietPlanUrl.slice(0, -1);
          }
          const dietPlanResponse = await axios.get(dietPlanUrl, config);
          dietItems.push(...dietPlanResponse.data);
          commit("setBookmarked", { category: "diet", data: dietItems });
        }
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  //action to bookmark an item
  async bookmarkItem({ commit }, { item, userId, itemType }) {
    try {
      const url = "http://localhost:3000/bookmark/addBookmark";
      const config = createAxiosConfig();
      const itemId = item._id;
      const response = await axios.post(
        url,
        { userId, itemId, itemType },
        config
      );

      if (response.status === 201) {
        commit("bookmarkItem", { itemType, item });
        useToast().success(
          `${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } Bookmarked successfully`
        );
      }
    } catch (error) {
      handleServerError(error);
    }
  },

  //action to undo bookmark of item
  async undoBookmark(
    { commit, dispatch }: { commit: Commit; dispatch: Dispatch },
    {
      itemId,
      userId,
      itemType,
    }: { itemId: string; userId: string; itemType: string }
  ) {
    try {
      const url = "http://localhost:3000/bookmark/undoBookmark";

      const config = createAxiosConfig();

      const response = await axios.post(
        url,
        {
          userId,
          itemId,
          itemType,
        },
        config
      );
      if (response.status === 201) {
        commit("undoBookmark", { itemType, itemId });
        useToast().success("Bookmark removed successfully");
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
