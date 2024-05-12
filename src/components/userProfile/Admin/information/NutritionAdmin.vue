<template>
  <div>
    <ProductSearch @search="handleSearch" />
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
</template>

<script>
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
import NutritionAction from "./actions/NutritionAction.vue";
import NutritionDialog from "./actions/NutritionDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
export default {
  components: {
    ProductSearch,
    NutritionAction,
    NutritionDialog,
    RemoveItem,
  },
  data() {
    return {
      selectedItem: null,
      foodItem: [], // Your array of exercises
      selectedFoodItem: null,
      dialogOpen: false,
      removeDialogOpen: false,
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

<style></style>
