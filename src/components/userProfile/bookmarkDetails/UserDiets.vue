<!-- this component is for displaying the bookmarked dietPlans of the user -->
<template>
  <v-container fluid>
    <v-row v-if="bookmarkedDiets.length != 0" class="d-flex flex-wrap">
      <v-col
        v-for="dietPlan in bookmarkedDiets"
        :key="dietPlan.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="mx-auto image-hover-effect" width="90%">
          <!-- diet plan image -->
          <v-img
            style="height: 200px"
            :src="getImgPath(dietPlan.src, dietPlan.cloudImg)"
            cover
            @click="exploreClicked(dietPlan)"
          >
          </v-img>

          <!-- dietPlan information -->
          <v-card-title class="text-center plan-name caption">
            Plan Name
          </v-card-title>
          <v-card-text class="text-center pb-0" style="font-weight: 500">
            {{ dietPlan.plan_name }}
          </v-card-text>
          <v-card-text class="d-flex info">
            <v-card-text style="font-weight: 450" class="p-0">
              <span class="label"> Diet Type: </span>{{ dietPlan.diet_type }}
            </v-card-text>
            <v-card-text style="font-weight: 450" class="p-0">
              <span class="label"> Purpose: </span>{{ dietPlan.purpose }}
            </v-card-text>
          </v-card-text>
          <!-- buttons for explore and bookmark/undoBookmark -->
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(dietPlan)"
              >Explore</v-btn
            >
            <v-btn
              color="orange"
              @click="undoBookmark(dietPlan)"
              :disabled="loadingDiet[dietPlan._id]"
              ><v-progress-circular
                v-if="loadingDiet[dietPlan._id]"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-if="!loadingDiet[dietPlan._id]">
                UNDO BOOKMARK
              </span></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- message to display if there is no items -->
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
  data() {
    return {
      loadingDiet: {}, // To track loading state for each dietPlan
    };
  },
  computed: {
    // to fetch bookmarked item from store
    bookmarkedDiets() {
      return this.$store.state.bookmarkModule.diet;
    },
  },
  methods: {
    //to fetch dietPlan image
    getImgPath(src, cloudImg) {
      return cloudImg || `../../../assets/img/dietPlan/${src}`;
    },
    //for navigate to detail page
    exploreClicked(dietPlan) {
      this.$emit("explore", { item: dietPlan, route: "dietDetail" });
    },
    //to undo bookmark
    async undoBookmark(diet) {
      const dietId = diet._id;
      this.loadingDiet[dietId] = true;
      const userId = this.$store.state.userModule.userId;
      await this.$store.dispatch("undoBookmark", {
        userId,
        itemId: dietId,
        itemType: "diet",
      });
      this.loadingDiet[dietId] = false;
    },
  },
};
</script>

<style scoped>
.plan-name {
  font-size: 20px;
  font-weight: bold;
}

.info {
  font-size: 16px;
}

.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.image-hover-effect {
  cursor: pointer;
}

.label {
  font-weight: 500;
}
</style>
