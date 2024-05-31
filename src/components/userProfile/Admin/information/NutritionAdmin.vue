<!-- this component is parent component of foodItem for the admin actions -->
<template>
  <div>
    <!-- component to handle search action by admin -->
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <!-- component to add new foodItem by admin -->
    <AddFoodItem :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="foodItems?.length > 0">
      <!-- component for options of edit and delete  -->
      <NutritionAction
        :foodItem="foodItems"
        @edit-foodItem="openEditDialog"
        @remove-foodItem="openRemoveDialog"
      />
      <!-- component for edit operation -->
      <NutritionDialog
        :foodItemData="selectedFoodItem"
        :dialogOpen="dialogOpen"
        @close-dialog="closeEditDialog"
      />
      <!-- component for delete operation -->
      <RemoveItem
        action="removeFoodItem"
        :item="selectedFoodItem"
        :dialogOpen="removeDialogOpen"
        @close-dialog="closeRemoveDialog"
      />
    </div>
  </div>
</template>

<script>
import ItemSearch from "@/components/common-components/ItemSearch.vue";
import NutritionAction from "./actions/NutritionAction.vue";
import NutritionDialog from "./actions/NutritionDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
import AddFoodItem from "./actions/addItem/AddFoodItem.vue";
export default {
  components: {
    ItemSearch,
    NutritionAction,
    NutritionDialog,
    RemoveItem,
    AddFoodItem,
  },
  data() {
    return {
      selectedItem: null,
      selectedFoodItem: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
    };
  },
  computed: {
    // data request sent to show some result when page first loads
    foodItems() {
      return this.$store.state.foodItemModule.searchFoodItem;
    },
  },
  methods: {
    //to open the edit dialog
    openEditDialog(foodItem) {
      this.selectedFoodItem = foodItem;
      this.dialogOpen = true;
    },
    // to close edit dialog
    closeEditDialog() {
      this.dialogOpen = false;
    },
    // to open delete dialog
    openRemoveDialog(foodItem) {
      this.selectedFoodItem = foodItem;
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

      this.fetchFoodItemWithFilters(this.selectedItem);
    },
  },
  async mounted() {
    //fetch data only once page loads
    if (this.foodItems.length === 0) {
      await this.$store.dispatch("searchFoodItem", name);
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
