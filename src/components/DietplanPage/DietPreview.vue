<template>
  <v-container fluid>
    <v-row v-if="loading" class="d-flex flex-wrap">
      <v-col v-for="n in skeletonCount" :key="n" cols="12" sm="6" md="4" lg="4">
        <v-skeleton-loader
          width="90%"
          class="border my-4 mx-2"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else class="d-flex flex-wrap">
      <v-col
        v-for="dietPlan in dietPlan"
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
          ></v-img>
          <v-card-title class="text-center plan-name caption">
            Plan Name:
          </v-card-title>
          <v-card-text class="text-center pb-0" style="font-weight: 500">
            {{ dietPlan.plan_name }}
          </v-card-text>
          <v-card-text class="d-flex info pb-0">
            <v-card-text style="font-weight: 450" class="p-0">
              Diet Type: <br />{{ dietPlan.diet_type }}
            </v-card-text>
            <v-card-text style="font-weight: 450" class="p-0">
              Purpose: <br />{{ dietPlan.purpose }}
            </v-card-text>
          </v-card-text>

          <v-card-actions class="d-flex justify-center">
            <v-btn color="orange" @click="exploreClicked(dietPlan)">
              Explore
            </v-btn>
            <v-btn color="orange" @click="bookmark(dietPlan)"> Bookmark </v-btn>
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
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    skeletonCount() {
      return this.loading ? this.dietPlan.length : 0;
    },
  },
  methods: {
    getImgPath(src, cloudImg) {
      return cloudImg || `../../../assets/img/dietPlan/${src}`;
    },
    exploreClicked(dietPlan) {
      this.$emit("explore", dietPlan);
    },
    bookmark(dietPlan) {
      const userId = this.$store.state.userModule.userId;
      const dietId = dietPlan._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: dietId,
        itemType: "diet",
      });
    },
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  watch: {
    dietPlan: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.loading = true;
          this.loadData();
        }
      },
      immediate: true,
    },
  },
  created() {
    this.loadData();
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
  justify-content: space-between;
}

.v-btn {
  width: 200px;
}
.image-hover-effect:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>
