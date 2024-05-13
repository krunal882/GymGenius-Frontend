<template>
  <v-container>
    <!-- <v-row v-if="loading">
      <v-col v-for="n in this.yoga.length" :key="n" cols="4">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row> -->
    <v-col v-for="yoga in yogas" :key="yoga.id" cols="4">
      <v-card class="image-hover-effect" width="900" style="display: flex">
        <div style="flex: 1; padding-right: 16px">
          <v-img height="300" :src="yoga.url_png">
            <v-card-title class="text-center">{{
              yoga.sanskrit_name
            }}</v-card-title>
          </v-img>
        </div>
        <hr
          style="
            height: 100%;
            border: none;
            border-right: 1px solid #ccc;
            margin: 0;
          "
        />

        <!-- Content container -->
        <div style="flex: 1; padding: 16px">
          <v-card-title class="pt-4"
            >Category: {{ yoga.category_name }}</v-card-title
          >
          <div class="d-flex">
            <v-card-text class="pt-4 flex-grow-1"
              >English Name: {{ yoga.english_name }}</v-card-text
            >
            <v-card-text class="pt-4 flex-grow-1"
              >Sanskrit Name: {{ yoga.sanskrit_name }}</v-card-text
            >
          </div>
          <v-card-text
            >Translation of Name: {{ yoga.translation_name }}</v-card-text
          >

          <v-card-actions style="justify-content: space-between">
            <v-btn color="primary" @click="editClick(yoga)">
              <v-icon left>mdi-pencil</v-icon> Edit</v-btn
            >
            <v-btn color="error" @click="deleteClick(yoga)">
              <v-icon left>mdi-delete</v-icon> Delete</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
    yogas: {
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
      return this.loading ? this.yoga.length : 0;
    },
  },
  methods: {
    editClick(yoga) {
      this.$emit("edit-yoga", yoga);
    },
    deleteClick(yoga) {
      this.$emit("remove-yoga", yoga);
    },
    loadData() {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
  watch: {
    yoga: {
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
.image-hover-effect:hover {
  transform: scale(1.1);
}
</style>
