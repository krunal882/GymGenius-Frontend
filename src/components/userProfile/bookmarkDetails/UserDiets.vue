<template>
  <v-container>
    <v-row v-if="bookmarkedDiets.length != 0" class="d-flex flex-wrap">
      <v-col
        v-for="dietPlan in bookmarkedDiets"
        :key="dietPlan.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="text-black my-4 mx-2 image-hover-effect" width="90%">
          <v-img
            style="height: 200px"
            :src="getImgPath(dietPlan.src, dietPlan.cloudImg)"
            cover
            @click="exploreClicked(dietPlan)"
          >
          </v-img>

          <v-card-title class="text-center plan-name">Plan Name: </v-card-title>
          <v-card-text class="text-center pb-0" style="font-weight: 500">{{
            dietPlan.plan_name
          }}</v-card-text>
          <v-card-text class="d-flex info pb-0">
            <v-card-text style="font-weight: 450" class="p-0"
              >Diet Type: <br />{{ dietPlan.diet_type }}</v-card-text
            >
            <v-card-text style="font-weight: 450" class="p-0"
              >Purpose: <br />{{ dietPlan.purpose }}</v-card-text
            >
          </v-card-text>

          <v-card-actions class="d-flex justify-center">
            <v-btn color="orange" @click="exploreClicked(dietPlan)"
              >Explore</v-btn
            >
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
    getImgPath(src, cloudImg) {
      return cloudImg || `../../../assets/img/dietPlan/${src}`;
    },
    exploreClicked(dietPlan) {
      this.$emit("explore", { item: dietPlan, route: "dietDetail" });
    },
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
