<template>
  <v-container>
    <v-row
      v-if="bookmarkedDiets.length != 0"
      style="justify-content: space-between"
    >
      <v-col v-for="dietPlan in bookmarkedDiets" :key="dietPlan.id" cols="4">
        <v-card class="text-black my-4 mx-2" min-width="350" height="400">
          <!-- Image -->
          <v-img
            class="align-end text-white"
            style="height: 200px; width: 100%; object-fit: cover"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            cover
          >
          </v-img>

          <!-- Plan Name -->
          <v-card-title class="text-center plan-name">Plan Name: </v-card-title>
          <v-card-text class="text-center pb-0" style="font-weight: 500">{{
            dietPlan.plan_name
          }}</v-card-text>
          <!-- Diet Type and Purpose -->
          <v-card-text class="d-flex info pb-0">
            <v-card-text style="font-weight: 450" class="p-0"
              >Diet Type: <br />{{ dietPlan.diet_type }}</v-card-text
            >
            <v-card-text style="font-weight: 450" class="p-0"
              >Purpose: <br />{{ dietPlan.purpose }}</v-card-text
            >
          </v-card-text>

          <!-- Explore Button -->
          <v-card-actions class="d-flex justify-center">
            <v-btn color="orange" @click="undoBookmark(dietPlan)"
              >Undo Bookmark</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-else>
      <v-alert :value="true" color="info" icon="mdi-information">
        You do not have any bookmarked diet plans. <br />
        Start exploring and bookmarking diet plans
      </v-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    bookmarkedDiets() {
      return this.$store.state.bookmarkModule.diet;
    },
  },
  methods: {
    undoBookmark(diet) {
      const userId = this.$store.state.userModule.userId;

      const dietId = diet._id;
      this.$store.dispatch("undoBookmark", {
        userId,
        itemId: dietId,
        itemType: "diet",
      });
    },
  },
};
</script>

<style></style>
