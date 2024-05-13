<template>
  <div>
    <ProductSearch @search="handleSearch" @add="openAddDialog" />
    <AddYoga :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
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
      action="removeYoga"
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
import AddYoga from "./actions/addItem/AddYoga.vue";
export default {
  components: {
    ProductSearch,
    YogaAction,
    YogaDialog,
    RemoveItem,
    AddYoga,
  },
  data() {
    return {
      selectedItem: null,
      yoga: [], 
      selectedYoga: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
    };
  },
  computed: {
    yogas() {
      return this.$store.state.yogaModule.yogaSearch;
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
    openRemoveDialog(yoga) {
      this.selectedYoga = yoga;
      this.removeDialogOpen = true;
    },
    closeRemoveDialog() {
      this.removeDialogOpen = false;
    },
    openAddDialog() {
      this.addDialogOpen = true;
    },
    closeAddDialog() {
      this.addDialogOpen = false;
    },
    handleSearch(searchItem) {
      this.selectedItem = searchItem;

      this.fetchYogaWithFilters(this.selectedItem);
    },
    async fetchYogaWithFilters(name) {
      try {
        await this.$store.dispatch("searchYoga", name);
      } catch (error) {
        console.error("Error fetching exercises with filters:", error);
      }
    },
  },
};
</script>

<style></style>
