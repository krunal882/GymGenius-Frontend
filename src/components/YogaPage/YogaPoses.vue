<!-- this component is the parent component for the yoga page , it includes the search field , filter , preview card components -->
<template>
  <div>
    <!-- hero header image -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="../../assets/img/yoga-wide_generated.jpg"
          class="w-100"
          alt="..."
        />
      </div>
    </div>
    <!-- tabs view -->
    <YogaInfoTabs />
    <!-- search field and filter component -->
    <div class="d-flex flex-wrap justify-content-center">
      <UserSearch @search="handleSearch" @clearSearch="clearField" />
      <YogaFilter @filters-applied="applyFilters" />
    </div>
    <!-- preview card component with the infinity scroll applied (with pagination) -->
    <div class="d-flex flex-wrap justify-content-center">
      <v-infinite-scroll @load="loadMoreProducts" infinite-distance="10">
        <YogaInfo :yoga="yoga" :loading="loading" @explore="exploreClicked" />
        <template v-slot:empty>
          <v-alert type="warning">No more yoga-poses!</v-alert>
        </template>
      </v-infinite-scroll>
    </div>
  </div>
</template>

<script>
import YogaInfo from "./YogaInfo.vue";
import YogaFilter from "./YogaFilter.vue";
import YogaInfoTabs from "./YogaInfoTabs.vue";
import UserSearch from "../common-components/UserSearch.vue";

export default {
  data() {
    return {
      selectedItem: null,
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
    YogaFilter,
    YogaInfoTabs,
    UserSearch,
  },
  methods: {
    //this method redirect to the yoga detail page
    async exploreClicked(yoga) {
      this.$router.push({
        name: "yogaDetail",
        params: { id: yoga.item._id },
      });
    },
    //this method is for the search functionality , handles search from the search-field component
    handleSearch(searchTerm) {
      this.searchTerm = searchTerm;
      this.page = 1;
      this.allLoaded = false;
      this.fetchYogaWithFilters({ name: searchTerm });
    },
    //this method is for clearing the stored search-field input
    clearField() {
      this.searchTerm = "";
    },
    //this method handles the applied filters coming from the filter component
    applyFilters(filteredFilters) {
      this.filterTerm = filteredFilters;
      this.page = 1;
      this.allLoaded = false;
      this.fetchYogaWithFilters(filteredFilters);
    },
    //fetchYogaWithFilters takes the filters and search text and call the action from the store
    async fetchYogaWithFilters(filteredFilters) {
      this.loading = true;
      try {
        const response = await this.$store.dispatch("fetchYoga", {
          filteredFilters,
          limit: this.limit,
          page: this.page,
        });
        //checks page , if first page then  set data otherwise append data to existing
        if (this.page === 1) {
          this.localYoga = response;
        } else {
          this.localYoga = [...this.localYoga, ...response];
        }
        //condition to check if all items are loaded or not
        this.allLoaded = response.length < this.limit;
        this.page += 1;
      } catch (error) {
        console.error("Error fetching yoga with filters:", error);
      } finally {
        //after fetching item , made loading false
        this.loading = false;
      }
    },
    //method is to send req and load more data
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
  //to get already stored yogas
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
