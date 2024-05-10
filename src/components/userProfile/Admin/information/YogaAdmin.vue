<template>
  <div>
    <ProductSearch @search="handleSearch" />
    <YogaAction :yogas="yogas" @edit-yoga="openEditDialog" />
    <YogaDialog
      :yogaData="selectedYoga"
      :dialogOpen="dialogOpen"
      @close-dialog="closeEditDialog"
    />
  </div>
</template>

<script>
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
import YogaAction from "./actions/YogaAction.vue";
import YogaDialog from "./actions/YogaDialog.vue";
export default {
  components: {
    ProductSearch,
    YogaAction,
    YogaDialog,
  },
  data() {
    return {
      selectedItem: null,
      yoga: [], // Your array of exercises
      selectedYoga: null,
      dialogOpen: false,
    };
  },
  computed: {
    yogas() {
      console.log(this.$store.state.yogaModule.yoga);
      return this.$store.state.yogaModule.yoga;
    },
  },
  methods: {
    openEditDialog(yoga) {
      this.selectedYoga = yoga;
      this.dialogOpen = true;
    },
    closeEditDialog() {
      this.dialogOpen = false;
    },
    handleSearch(searchItem) {
      this.selectedItem = searchItem;

      this.fetchYogaWithFilters({ name: this.selectedItem });
    },
    async fetchYogaWithFilters(filteredFilters) {
      try {
        await this.$store.dispatch("fetchYoga", filteredFilters);
      } catch (error) {
        console.error("Error fetching exercises with filters:", error);
      }
    },
  },
};
</script>

<style></style>
