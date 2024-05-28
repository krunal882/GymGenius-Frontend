<template>
  <v-container>
    <v-row v-if="loading">
      <v-col v-for="n in skeletonCount" :key="n" cols="12" sm="6" md="4" lg="4">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="image, article, chip@2"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="yoga in yoga" :key="yoga.id" cols="12" sm="6" md="4" lg="4">
        <v-card class="image-hover-effect" width="100%">
          <v-img
            height="200"
            :src="yoga.url_png"
            class="pointer"
            @click="exploreClicked(yoga)"
          >
          </v-img>
          <v-card-text>
            <v-card-title class="text-center">{{
              yoga.sanskrit_name
            }}</v-card-title>
            <div class="mb-2">Category: {{ yoga.category_name }}</div>
            <div class="mb-2">English Name: {{ yoga.english_name }}</div>
            <div class="mb-2">Sanskrit Name: {{ yoga.sanskrit_name }}</div>
            <div>Translation: {{ yoga.translation_name }}</div>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn color="orange" @click="exploreClicked(yoga)">Explore</v-btn>
            <v-btn color="orange" @click="bookmark(yoga)">Bookmark</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    yoga: {
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
    exploreClicked(yoga) {
      this.$emit("explore", yoga);
    },
    bookmark(yoga) {
      const userId = this.$store.state.userModule.userId;
      const yogaId = yoga._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: yogaId,
        itemType: "yoga",
      });
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
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
.pointer {
  cursor: pointer;
}
</style>
