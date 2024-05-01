<template>
  <div>
    <!-- Carousel -->
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../../assets/img/yoga-wide_generated.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
    </div>

    <YogaInfoTabs />
    <div class="flex-row">
      <YogaFilter @filters-applied="applyFilters" />
      <div class="flex-column">
        <YogaInfo
          v-if="!exploreClicked"
          :yoga="yoga"
          @explore="handleExploreClick"
        />
        <YogaDetails
          v-else
          @explore="handleExploreClick"
          :yoga="selectedCategory"
        />
      </div>
    </div>
    <!-- Yoga Poses or Details -->
    <!-- <div class="flex-row">
      <YogaPoses v-if="!exploreClicked" @explore="handleExploreClick" />
      <YogaDetails v-else @explore="handleExploreClick" />
    </div> -->
  </div>
</template>

<script>
import YogaInfo from "./YogaInfo.vue";
import YogaDetails from "./YogaDetails.vue";
import YogaFilter from "./YogaFilter.vue";
import YogaInfoTabs from "./YogaInfoTabs.vue";

export default {
  data() {
    return {
      exploreClicked: false,
      selectedCategory: null, // Initialize exploreClicked to false
    };
  },
  components: {
    YogaInfo,
    YogaDetails,
    YogaFilter,
    YogaInfoTabs,
  },
  methods: {
    handleExploreClick(yoga) {
      this.exploreClicked = !this.exploreClicked;
      this.selectedCategory = yoga;
    },
    applyFilters(filteredFilters) {
      // Your filtering logic here
      this.fetchYogaWithFilters(filteredFilters);
    },
    async fetchYogaWithFilters(filteredFilters) {
      try {
        // Dispatch the fetchYoga action with the filtered filters
        await this.$store.dispatch("fetchYoga", filteredFilters);
      } catch (error) {
        console.error("Error fetching yoga with filters:", error);
      }
    },
  },
  computed: {
    yoga() {
      return this.$store.state.yogaModule.yoga;
    },
  },
  mounted() {
    this.$store.dispatch("fetchYoga");
  },
};
</script>

<style>
.flex-row {
  display: flex;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
