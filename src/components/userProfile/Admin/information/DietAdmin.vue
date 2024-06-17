<!-- this component is parent component of dietPlan for the admin actions -->
<template>
  <div>
    <!-- component to handle search action by admin -->
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <!-- component to add new dietPlan by admin -->
    <AddDiet :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="dietPlans.length > 0">
      <!-- component for options of edit and delete  -->
      <DietAction
        :dietPlan="dietPlans"
        @edit-dietPlan="openEditDialog"
        @remove-dietPlan="openRemoveDialog"
      />
      <!-- component for edit operation -->
      <DietDialog
        :dietPlanData="selectedDietPlan"
        :dialogOpen="dialogOpen"
        @close-dialog="closeEditDialog"
      />
      <!-- component for delete operation -->
      <RemoveItem
        action="removeDiet"
        :item="selectedDietPlan"
        :dialogOpen="removeDialogOpen"
        @close-dialog="closeRemoveDialog"
      />
    </div>
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
      selectedDietPlan: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
    };
  },
  computed: {
    // data request sent to show some result when page first loads
    dietPlans() {
      return this.$store.state.dietPlanModule.dietSearch;
    },
  },
  methods: {
    //to open the edit dialog
    openEditDialog(dietPlan) {
      this.selectedDietPlan = dietPlan;
      this.dialogOpen = true;
    },
    // to close edit dialog
    closeEditDialog() {
      this.dialogOpen = false;
    },
    // to open delete dialog
    openRemoveDialog(dietPlan) {
      this.selectedDietPlan = dietPlan;
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
    async handleSearch(name) {
      await this.$store.dispatch("searchDiet", name);
    },
  },
  async mounted() {
    //fetch data only once page loads
    if (this.dietPlans.length === 0) {
      await this.$store.dispatch("searchDiet", name);
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
