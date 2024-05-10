<template>
  <div>
    <ProductSearch @search="handleSearch" />
    <NutritionAction :foodItem="foodItems" @edit-foodItem="openEditDialog" />
    <NutritionDialog
      :foodItemData="selectedFoodItem"
      :dialogOpen="dialogOpen"
      @close-dialog="closeEditDialog"
    />
  </div>
</template>

<script>
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
import NutritionAction from "./actions/NutritionAction.vue";
import NutritionDialog from "./actions/NutritionDialog.vue";
export default {
  components: {
    ProductSearch,
    NutritionAction,
    NutritionDialog,
  },
  data() {
    return {
      selectedItem: null,
      foodItem: [], // Your array of exercises
      selectedFoodItem: null,
      dialogOpen: false,
    };
  },
  computed: {
    foodItems() {
      return this.$store.state.foodItemModule.foodItem;
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
    handleSearch(searchItem) {
      console.log(searchItem);
      this.selectedItem = searchItem;

      this.fetchFoodItemWithFilters({ name: this.selectedItem });
    },
    async fetchFoodItemWithFilters(filteredFilters) {
      try {
        await this.$store.dispatch("fetchFoodItem", filteredFilters);
      } catch (error) {
        console.error("Error fetching exercises with filters:", error);
      }
    },
  },
};
</script>

<style></style>
