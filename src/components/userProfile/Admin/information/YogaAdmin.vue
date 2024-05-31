<!-- this component is parent component of yoga for the admin actions -->
<template>
  <div>
    <!-- component to handle search action by admin -->
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <!-- component to add new yoga pose by admin -->
    <AddYoga :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="yogas?.length > 0">
      <!-- component for options of edit and delete  -->
      <YogaAction
        :yogas="yogas"
        @edit-yoga="openEditDialog"
        @remove-yoga="openRemoveDialog"
      />
      <!-- component for edit operation -->
      <YogaDialog
        :yogaData="selectedYoga"
        :dialogOpen="dialogOpen"
        @close-dialog="closeEditDialog"
      />
      <!-- component for delete operation -->
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
    // data request sent to show some result when page first loads
    yogas() {
      return this.$store.state.yogaModule.yogaSearch;
    },
  },
  methods: {
    //to open the edit dialog
    openEditDialog(yoga) {
      this.selectedYoga = yoga;
      this.dialogOpen = true;
    },
    // to close edit dialog
    closeEditDialog() {
      this.dialogOpen = false;
    },
    // to open delete dialog
    openRemoveDialog(yoga) {
      this.selectedYoga = yoga;
      this.removeDialogOpen = true;
    },
    //to close delete dialog
    closeRemoveDialog() {
      this.removeDialogOpen = false;
    },
    //to open add new dialog
    openAddDialog() {
      this.addDialogOpen = true;
    },
    //to close add new dialog
    closeAddDialog() {
      this.addDialogOpen = false;
    },
    //to handle search operation by admin
    handleSearch(searchItem) {
      this.selectedItem = searchItem;

      this.fetchYogaWithFilters(this.selectedItem);
    },
  },
  async mounted() {
    //fetch data only once page loads
    if (this.yoga.length === 0) {
      await this.$store.dispatch("searchYoga", name);
    }
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
