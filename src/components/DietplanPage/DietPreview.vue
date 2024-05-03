<template>
  <v-container>
    <v-row style="justify-content: space-between">
      <v-col v-for="dietPlan in dietPlan" :key="dietPlan.id" cols="4">
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
            <v-btn color="orange" @click="exploreClicked(dietPlan)"
              >Explore</v-btn
            >
            <v-btn color="orange" @click="bookmark(dietPlan)">Bookmark</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    dietPlan: {
      type: Array,
      required: true,
    },
  },
  methods: {
    exploreClicked(dietPlan) {
      this.$emit("explore", dietPlan);
    },
    bookmark(dietPlan) {
      const userId = this.$store.state.userModule.user._id;
      console.log(userId, dietPlan._id);
      const dietId = dietPlan._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: dietId,
        itemType: "diet",
      });
    },
  },
};
</script>

<style scoped>
.plan-name {
  font-size: 20px; /* Larger font size for plan name */
  font-weight: bold; /* Bold font weight */
}

.info {
  font-size: 16px; /* Font size for info text */
  justify-content: space-between; /* Align items evenly */
}

/* Style the button */
.v-btn {
  width: 200px; /* Set button width */
}
</style>
