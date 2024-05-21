<template>
  <div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../assets/img/yoga-wide_generated.jpg"
          class="d-block w-100 carousel-image"
          alt="..."
        />
      </div>
    </div>

    <YogaInfoTabs />
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" />
      <YogaFilter @filters-applied="applyFilters" />
    </div>
    <div class="d-flex flex-wrap justify-content-center">
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
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
        <template v-slot:empty>
          <v-alert type="warning">No more products!</v-alert>
        </template>
      </v-infinite-scroll>
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
      limit: 10,
      page: 1,
      loading: false,
      searchTerm: "",
      filterTerm: "",
      allLoaded: false,
      localYoga: [],
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
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.fetchYogaWithFilters({ name: searchTerm });
    },
    handleExploreClick(yoga) {
      this.exploreClicked = !this.exploreClicked;
      this.selectedCategory = yoga;
    },
    applyFilters(filteredFilters) {
      this.filterTerm = filteredFilters;
      this.page = 1;
      this.allLoaded = false;
      this.fetchYogaWithFilters(filteredFilters);
    },
    async fetchYogaWithFilters(filteredFilters) {
      this.loading = true;
      try {
        const response = await this.$store.dispatch("fetchYoga", {
          filteredFilters,
          limit: this.limit,
          page: this.page,
        });
        if (this.page === 1) {
          this.localYoga = response;
        } else {
          this.localYoga = [...this.localYoga, ...response];
        }
        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching yoga with filters:", error);
      } finally {
        this.loading = false;
      }
    },
    async loadMoreProducts({ done }) {
      if (this.allLoaded || this.loading) {
        done("empty");
        return;
      }

      this.loading = true;
      try {
        let filter = {};
        if (this.searchTerm) {
          filter.name = this.searchTerm;
        }
        if (this.filterTerm) {
          filter = { ...filter, ...this.filterTerm };
        }

        const response = await this.$store.dispatch("fetchYoga", {
          filteredFilters: filter,
          limit: this.limit,
          page: this.page,
        });

        if (response.length === 0) {
          this.allLoaded = true;
        } else {
          this.localYoga = [...this.localYoga, ...response];
          this.page += 1;
        }

        done(this.allLoaded ? "empty" : null);
      } catch (error) {
        console.error("Error loading more yoga-poses:", error);
        done("error");
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    yoga: {
      get() {
        return this.localYoga;
      },
      set(value) {
        this.localYoga = value;
      },
    },
  },
  watch: {
    "$store.state.yogaModule.yoga": {
      handler(newVal) {
        this.localYoga = newVal;
      },
      immediate: true,
    },
  },
  mounted() {
    this.fetchYogaWithFilters();
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
