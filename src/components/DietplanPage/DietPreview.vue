<!-- this component gives the preview of the dietPlan that contains some info about dietPlan in card form -->
<!-- it also includes explore button to see full details and bookmark button for bookmarking -->
<template>
  <v-container fluid>
    <!-- skeleton loader for the card  -->
    <!-- <v-row v-if="loading">
      <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="4">
        <v-skeleton-loader
          class="border"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row> -->
    <!-- dietPlan preview card -->
    <v-row class="d-flex flex-wrap">
      <v-col
        v-for="dietPlan in dietPlan"
        :key="dietPlan._id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="mx-auto image-hover-effect" width="90%">
          <!-- dietPlan image -->
          <v-img
            style="height: 200px"
            :src="getImgPath(dietPlan.src, dietPlan.cloudImg)"
            cover
            alt="diet plane image"
            @click="exploreClicked(dietPlan)"
          ></v-img>
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

          <!-- buttons for explore and bookmark-undoBookmark -->
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(dietPlan)">
              Explore
            </v-btn>
            <v-btn
              color="orange"
              @click="toggleBookmark(dietPlan, 'diet')"
              :disabled="loadingDiet[dietPlan._id]"
            >
              <v-progress-circular
                v-if="loadingDiet[dietPlan._id]"
                indeterminate
                size="20"
              ></v-progress-circular>
              <span v-if="!loadingDiet[dietPlan._id]">
                {{ isBookmarked(dietPlan) ? "Undo Bookmark" : "Bookmark" }}
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bookmarkMixin from "./../../mixins/bookmarkMixin.js";
export default {
  mixins: [bookmarkMixin],
  props: {
    dietPlan: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loadingDiet: {}, // To track loading state for each dietPlan
    };
  },
  computed: {
    //it returns the bookmarked dietPlan of the user
    bookmarked() {
      return this.$store.state.bookmarkModule.diet;
    },
  },
  methods: {
    //to get image form the local or stored on cloud
    getImgPath(src, cloudImg) {
      return cloudImg || `../../../assets/img/dietPlan/${src}`;
    },
    //to emit an event to navigate to detail page
    exploreClicked(dietPlan) {
      this.$emit("explore", { item: dietPlan, route: "dietDetail" });
    },
    // Override toggleBookmark to handle loading state
    async toggleBookmark(dietPlan, itemType) {
      const dietId = dietPlan._id;
      this.loadingDiet[dietId] = true;

      try {
        await this.bookmarkOrUndo(dietPlan, itemType);
      } finally {
        this.loadingDiet[dietId] = false;
      }
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
