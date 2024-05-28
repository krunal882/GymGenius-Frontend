<template>
  <div>
    <v-card>
      <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
        <v-tab :value="1">Exercises</v-tab>
        <v-tab :value="2">Yoga Poses</v-tab>
        <v-tab :value="3">Diet Plans</v-tab>
        <v-tab :value="4">Food Nutrition</v-tab>
      </v-tabs>
    </v-card>

    <v-card>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <template v-if="tab === 1">
            <UserExercises
              :exercise="bookmarkedExercises"
              @explore="exploreClicked"
            />
          </template>
          <template v-else-if="tab === 2">
            <UserYogas :yoga="bookmarkedYogas" @explore="exploreClicked" />
          </template>
          <template v-else-if="tab === 3">
            <UserDiets :diet="bookmarkedDiets" @explore="exploreClicked" />
          </template>
          <template v-else-if="tab === 4">
            <UserNutritions
              :nutrition="bookmarkedNutritions"
              @explore="exploreClicked"
            />
          </template>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </div>
</template>

<script>
import UserExercises from "./bookmarkDetails/UserExercises.vue";
import UserYogas from "./bookmarkDetails/UserYogas.vue";
import UserNutritions from "./bookmarkDetails/UserNutritions.vue";
import UserDiets from "./bookmarkDetails/UserDiets.vue";
import { mapActions } from "vuex";

export default {
  components: {
    UserExercises,
    UserYogas,
    UserNutritions,
    UserDiets,
  },
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    bookmarkedExercises() {
      return this.$store.state.bookmarkModule.exercise;
    },
    bookmarkedYogas() {
      return this.$store.state.bookmarkModule.yoga;
    },
    bookmarkedDiets() {
      return this.$store.state.bookmarkModule.diet;
    },
    bookmarkedNutritions() {
      return this.$store.state.bookmarkModule.nutrition;
    },
  },
  methods: {
    ...mapActions(["fetchBookmarked"]),
    async exploreClicked(item) {
      this.$router.push({
        name: item.route,
        params: { id: item.item._id },
      });
    },
  },

  created() {
    const userId = this.$store.state.userModule.userId;
    this.fetchBookmarked({ userId });
  },
};
</script>

<style></style>
