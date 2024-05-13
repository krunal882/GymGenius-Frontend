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
    <v-row justify="center" dense>
      <v-col class="mt-5 d-flex" cols="4">
        <v-text-field
          v-model="selectedItem"
          class="mx-auto"
          dense
          placeholder="Type exercise name here"
          append-outer-icon="mdi-magnify"
          style="max-width: 350px"
          variant="outlined"
          rounded
        >
          <template v-slot:append>
            <v-btn @click="search" color="success">Search</v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
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
  },
  methods: {
    search() {
      this.fetchYogaWithFilters({ name: this.selectedItem });
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
