<template>
  <div>
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
    <UserSearch @search="handleSearch" />
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
  </div>
</template>

<script>
import YogaInfo from "./YogaInfo.vue";
import YogaDetails from "./YogaDetails.vue";
import YogaFilter from "./YogaFilter.vue";
import YogaInfoTabs from "./YogaInfoTabs.vue";
import UserSearch from "../common-components/UserSearch.vue";

export default {
  data() {
    return {
      selectedItem: null,
      exploreClicked: false,
      selectedCategory: null,
    };
  },
  components: {
    YogaInfo,
    YogaDetails,
    YogaFilter,
    YogaInfoTabs,
    UserSearch,
  },
  methods: {
    handleSearch(searchTerm) {
      if (searchTerm) {
        this.fetchYogaWithFilters({ name: searchTerm });
      }
    },
    handleExploreClick(yoga) {
      this.exploreClicked = !this.exploreClicked;
      this.selectedCategory = yoga;
    },
    applyFilters(filteredFilters) {
      this.fetchYogaWithFilters(filteredFilters);
    },
    async fetchYogaWithFilters(filteredFilters) {
      try {
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
