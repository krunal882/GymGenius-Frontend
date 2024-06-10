<!-- this component is parent component for displaying the users bookmarked items -->
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

    <v-card style="min-height: 600px">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <!-- exercise section -->
          <template v-if="tab === 1">
            <UserExercises @explore="exploreClicked" />
          </template>
          <!-- yoga section -->
          <template v-else-if="tab === 2">
            <UserYogas @explore="exploreClicked" />
          </template>
          <!-- dietPlan section -->
          <template v-else-if="tab === 3">
            <UserDiets @explore="exploreClicked" />
          </template>
          <!-- foodItem section -->
          <template v-else-if="tab === 4">
            <UserNutritions @explore="exploreClicked" />
          </template>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </div>
</template>

<script>
import UserExercises from "./bookmarkDetails/UserExercises.vue";
import UserYogas from "./bookmarkDetails/UserYogas.vue";
import UserDiets from "./bookmarkDetails/UserDiets.vue";
import UserNutritions from "./bookmarkDetails/UserNutritions.vue";

export default {
  components: {
    UserYogas,
    UserDiets,
    UserNutritions,
    UserExercises,
  },
  data() {
    return {
      tab: null,
    };
  },
  // to fetch items from the store
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
    //to navigate to detail page
    async exploreClicked(item) {
      this.$router.push({
        name: item.route,
        params: { id: item.item._id },
      });
    },
  },
};
</script>

<style scoped></style>
