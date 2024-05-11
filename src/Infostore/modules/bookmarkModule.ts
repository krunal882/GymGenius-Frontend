import axios, { AxiosResponse } from "axios";
import { Commit, Dispatch } from "vuex";
// import { toast } from "vue3-toastify";
// import "vue3-toastify/dist/index.css";

interface State {
  exercise: any[];
  nutrition: any[];
  yoga: any[];
  diet: any[];
}

const state: State = {
  exercise: [],
  nutrition: [],
  yoga: [],
  diet: [],
};

const mutations = {
  setBookmarked(state: State, payload: { category: string; data: any[] }) {
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
  async fetchBookmarked(
    { commit }: { commit: Commit },
    { userId }: { userId: string }
  ) {
    try {
      const url = `http://localhost:3000/bookmark/getBookmarked?userId=${userId}`;
      const response = await axios.get(url);

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

      // Fetch and accumulate exercises
      if (exerciseIds && exerciseIds.length !== 0) {
        let exerciseUrl = "http://localhost:3000/exercises/filtered?";
        exerciseIds.forEach((id: string) => {
          exerciseUrl += `exerciseId=${id}&`;
        });
        if (exerciseUrl.endsWith("&")) {
          exerciseUrl = exerciseUrl.slice(0, -1);
        }
        const exercisesResponse = await axios.get(exerciseUrl);
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
        const yogaResponse = await axios.get(yogaUrl);
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
        const nutritionResponse = await axios.get(nutritionUrl);
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
        const dietPlanResponse = await axios.get(dietPlanUrl);
        dietItems.push(...dietPlanResponse.data);
        commit("setBookmarked", { category: "diet", data: dietItems });
      }
    } catch (error) {
      console.error("Error fetching bookmarked items:", error);
    }
  },
  async bookmarkItem(
    { commit }: { commit: Commit },
    {
      itemId,
      userId,
      itemType,
    }: { itemId: string; userId: string; itemType: string }
  ) {
    try {
      const url = "http://localhost:3000/bookmark/addBookmark";

      await axios.post(url, {
        userId,
        itemId,
        itemType,
      });
      // switch (itemType) {
      //   case "exercise":
      //     toast.success("Exercise bookmarked");
      //     break;
      //   case "diet":
      //     toast.success("Diet-plan bookmarked");
      //     break;
      //   case "yoga":
      //     toast.success("Yoga-pose bookmarked");
      //     break;
      //   case "nutrition":
      //     toast.success("Food-item bookmarked");
      //     break;
      //   default:
      //     toast.success("Item bookmarked");
      //     break;
      // }
    } catch (error) {
      console.log(error);
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

      await axios.post(url, {
        userId,
        itemId,
        itemType,
      });
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
