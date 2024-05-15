<template>
  <div>
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <AddDiet :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
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
import ItemSearch from "@/components/common-components/ItemSearch.vue";
import DietAction from "./actions/DietAction.vue";
import DietDialog from "./actions/DietDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
import AddDiet from "./actions/addItem/AddDiet.vue";
export default {
  components: {
    ItemSearch,
    DietAction,
    DietDialog,
    RemoveItem,
    AddDiet,
  },
  data() {
    return {
      selectedItem: null,
      dietPlan: [],
      selectedDietPlan: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
    };
  },
  computed: {
    dietPlans() {
      return this.$store.state.dietPlanModule.dietSearch;
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
    openAddDialog() {
      this.addDialogOpen = true;
    },
    closeAddDialog() {
      this.addDialogOpen = false;
    },
    handleSearch(searchItem) {
      this.selectedItem = searchItem;

      this.fetchDietPlanWithFilters(this.selectedItem);
    },
    async fetchDietPlanWithFilters(name) {
      try {
        await this.$store.dispatch("searchDiet", name);
      } catch (error) {
        console.error("Error fetching fetchDietPlan with filters:", error);
      }
    },
  },
};
</script>

<style></style>
