<template>
  <div>
    <ProductSearch @search="handleSearch" />
    <YogaAction
      :yogas="yogas"
      @edit-yoga="openEditDialog"
      @remove-yoga="openRemoveDialog"
    />
    <YogaDialog
      :yogaData="selectedYoga"
      :dialogOpen="dialogOpen"
      @close-dialog="closeEditDialog"
    />
    <RemoveItem
      :action="removeYoga()"
      :item="selectedYoga"
      :dialogOpen="removeDialogOpen"
      @close-dialog="closeRemoveDialog"
    />
  </div>
</template>

<script>
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
import YogaAction from "./actions/YogaAction.vue";
import YogaDialog from "./actions/YogaDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
export default {
  components: {
    ProductSearch,
    YogaAction,
    YogaDialog,
    RemoveItem,
  },
  data() {
    return {
      selectedItem: null,
      yoga: [], // Your array of exercises
      selectedYoga: null,
      dialogOpen: false,
      removeDialogOpen: false,
    };
  },
  computed: {
    yogas() {
      console.log(this.$store.state.yogaModule.yoga);
      return this.$store.state.yogaModule.yoga;
    },
  },
  methods: {
    removeYoga() {
      return "removeYoga";
    },
    openEditDialog(yoga) {
      this.selectedYoga = yoga;
      this.dialogOpen = true;
    },
    closeEditDialog() {
      this.dialogOpen = false;
    },
    openRemoveDialog(yoga) {
      this.selectedYoga = yoga;
      this.removeDialogOpen = true;
    },
    closeRemoveDialog() {
      this.removeDialogOpen = false;
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
