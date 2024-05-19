import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { Commit, Dispatch } from "vuex";
const createAxiosConfig = () => {
  const token = Cookies.get("token");
  return {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const state = {
  exercise: [],
  nutrition: [],
  yoga: [],
  diet: [],
};

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
};

const actions = {
  async fetchBookmarked({ commit }, { userId }) {
    try {
      const config = createAxiosConfig();
      const url = `http://localhost:3000/bookmark/getBookmarked?userId=${userId}`;
      const response = await axios.get(url, config);

      if (response.data.length === 0) {
        console.log("No bookmarked items found.");
        return;
      }

      const exerciseItems = [];
      const yogaItems = [];
      const dietItems = [];
      const nutritionItems = [];

      const itemId = response.data[0].item;
      const exerciseIds = itemId.exercise;
      const yogaIds = itemId.yoga;
      const nutritionIds = itemId.nutrition;
      const dietPlanIds = itemId.diet;

      if (exerciseIds && exerciseIds.length !== 0) {
        let exerciseUrl = "http://localhost:3000/exercises/filtered?";
        exerciseIds.forEach((id: string) => {
          exerciseUrl += `exerciseId=${id}&`;
        });
        if (exerciseUrl.endsWith("&")) {
          exerciseUrl = exerciseUrl.slice(0, -1);
        }
        const exercisesResponse = await axios.get(exerciseUrl, config);
        exerciseItems.push(...exercisesResponse.data);
        commit("setBookmarked", { category: "exercise", data: exerciseItems });
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
          nutritionUrl += `nutritionId=${id}&`;
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
    } catch (error) {
      console.error("Error fetching bookmarked items:", error);
    }
  },
  async bookmarkItem({ commit }, { itemId, userId, itemType }) {
    try {
      const url = "http://localhost:3000/bookmark/addBookmark";
      const config = createAxiosConfig();

      const response = await axios.post(
        url,
        { userId, itemId, itemType },
        config
      );
      console.log(response);

      if (response.status === 201) {
        switch (itemType) {
          case "exercise":
            useToast().success("Exercise Bookmarked successfully");
            break;
          case "diet":
            useToast().success("Diet-plan Bookmarked successfully");
            break;
          case "yoga":
            useToast().success("Yoga-pose Bookmarked successfully");
            break;
          case "nutrition":
            useToast().success("Food-item Bookmarked successfully");
            break;
          default:
            useToast().success("Item Bookmarked successfully");
            break;
        }
      }
    } catch (error) {
      console.log(error);
      useToast().error("An error occurred while bookmarking the item.");
    }
  },
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
        useToast().success("Bookmark removed successfully");
      }
      await dispatch("fetchBookmarked", { userId });
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
