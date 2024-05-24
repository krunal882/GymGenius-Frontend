<template>
  <v-container>
    <!-- <v-row v-if="loading">
      <v-col v-for="n in this.dietPlan.length" :key="n" cols="12" md="6" lg="4">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row> -->

    <v-row class="d-flex flex-wrap" style="justify-content: space-between">
      <v-col
        v-for="dietPlan in dietPlan"
        :key="dietPlan.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="text-black my-4 mx-2" min-width="350" height="400">
          <v-img
            class="align-end text-white"
            style="height: 200px"
            :src="getImgPath(dietPlan.src, dietPlan.cloudImg)"
            cover
            alt="pic"
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

          <v-card-actions style="justify-content: space-between">
            <v-btn color="primary" @click="editClick(dietPlan)">
              <v-icon left>mdi-pencil</v-icon> Edit
            </v-btn>
            <v-btn color="error" @click="deleteClick(dietPlan)">
              <v-icon left>mdi-delete</v-icon> Delete
            </v-btn>
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
  methods: {
    getImgPath(src, cloudImg) {
      if (cloudImg === undefined) {
        return require(`@/assets/img/dietPlan/${src}`);
      } else {
        return cloudImg;
      }
    },
    editClick(dietPlan) {
      this.$emit("edit-dietPlan", dietPlan);
    },
    deleteClick(dietPlan) {
      this.$emit("remove-dietPlan", dietPlan);
    },
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  computed: {
    skeletonCount() {
      return this.loading ? this.dietPlan.length : 0;
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
  transform: scale(1.1);
}
</style>
