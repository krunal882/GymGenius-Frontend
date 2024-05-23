<template>
  <div>
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <AddFoodItem :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="foodItems.length > 0">
      <NutritionAction
        :foodItem="foodItems"
        @edit-foodItem="openEditDialog"
        @remove-foodItem="openRemoveDialog"
      />
      <NutritionDialog
        :foodItemData="selectedFoodItem"
        :dialogOpen="dialogOpen"
        @close-dialog="closeEditDialog"
      />
      <RemoveItem
        action="removeFoodItem"
        :item="selectedFoodItem"
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
      foodItem: [], // Your array of exercises
      selectedFoodItem: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
    };
  },
  computed: {
    foodItems() {
      return this.$store.state.foodItemModule.searchFoodItem;
    },
  },
  methods: {
    openEditDialog(foodItem) {
      this.selectedFoodItem = foodItem;
      this.dialogOpen = true;
    },
    closeEditDialog() {
      this.dialogOpen = false;
    },
    openRemoveDialog(foodItem) {
      this.selectedFoodItem = foodItem;
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

      this.fetchFoodItemWithFilters(this.selectedItem);
    },
    async fetchFoodItemWithFilters(name) {
      try {
        await this.$store.dispatch("searchFoodItem", name);
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
