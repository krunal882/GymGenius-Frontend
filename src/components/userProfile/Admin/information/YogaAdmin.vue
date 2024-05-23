<template>
  <div>
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <AddYoga :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="yogas.length > 0">
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
    <div v-else class="no-item-container">
      <p class="no-item-text">Search something for result</p>
    </div>
  </div>
</template>

<script>
import ItemSearch from "@/components/common-components/ItemSearch.vue";
import YogaAction from "./actions/YogaAction.vue";
import YogaDialog from "./actions/YogaDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
import AddYoga from "./actions/addItem/AddYoga.vue";
export default {
  components: {
    ItemSearch,
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

<style scoped>
.no-item-container {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.no-item-text {
  font-size: 24px;
  color: #000000;
}
</style>
