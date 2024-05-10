<template>
  <div>
    <ProductSearch @search="handleSearch" />
    <DietAction
      :dietPlan="dietPlans"
      @edit-dietPlan="openEditDialog"
      @remove-dietPlan="openRemoveDialog"
    />
    <DietDialog
      :dietPlanData="selectedDietPlan"
      :dialogOpen="dialogOpen"
      @close-dialog="closeEditDialog"
    />
    <RemoveItem
      action="removeDiet"
      :item="selectedDietPlan"
      :dialogOpen="removeDialogOpen"
      @close-dialog="closeRemoveDialog"
    />
  </div>
</template>

<script>
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
import DietAction from "./actions/DietAction.vue";
import DietDialog from "./actions/DietDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
export default {
  components: {
    ProductSearch,
    DietAction,
    DietDialog,
    RemoveItem,
  },
  data() {
    return {
      selectedItem: null,
      dietPlan: [],
      selectedDietPlan: null,
      dialogOpen: false,
      removeDialogOpen: false,
    };
  },
  computed: {
    dietPlans() {
      return this.$store.state.dietPlanModule.dietPlan;
    },
  },
  methods: {
    openEditDialog(dietPlan) {
      this.selectedDietPlan = dietPlan;
      this.dialogOpen = true;
    },
    closeEditDialog() {
      this.dialogOpen = false;
    },
    openRemoveDialog(dietPlan) {
      this.selectedDietPlan = dietPlan;
      this.removeDialogOpen = true;
    },
    closeRemoveDialog() {
      this.removeDialogOpen = false;
    },
    handleSearch(searchItem) {
      console.log(searchItem);
      this.selectedItem = searchItem;

      this.fetchDietPlanWithFilters({ name: this.selectedItem });
    },
    async fetchDietPlanWithFilters(filteredFilters) {
      try {
        await this.$store.dispatch("fetchDietPlan", filteredFilters);
      } catch (error) {
        console.error("Error fetching fetchDietPlan with filters:", error);
      }
    },
  },
};
</script>

<style></style>
