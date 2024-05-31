<!-- this component is parent component of exercise for the admin actions -->
<template>
  <div>
    <!-- component to handle search action by admin -->
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <!-- component to add new exercise by admin -->
    <AddExercise :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="exercises?.length > 0">
      <!-- component for options of edit and delete  -->
      <ExerciseActions
        :exercises="exercises"
        @edit-exercise="openEditDialog"
        @remove-exercise="openRemoveDialog"
      />
      <!-- component for edit operation -->
      <ExerciseDialog
        :exerciseData="selectedExercise"
        :dialogOpen="dialogOpen"
        @close-dialog="closeEditDialog"
      />
      <!-- component for delete operation -->
      <RemoveItem
        action="removeExercise"
        :item="selectedExercise"
        :dialogOpen="removeDialogOpen"
        @close-dialog="closeRemoveDialog"
      />
    </div>
  </div>
</template>

<script>
import ItemSearch from "@/components/common-components/ItemSearch.vue";
import ExerciseActions from "./actions/ExerciseActions.vue";
import ExerciseDialog from "./actions/ExerciseDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
import AddExercise from "./actions/addItem/AddExercise.vue";
export default {
  components: {
    ItemSearch,
    ExerciseActions,
    ExerciseDialog,
    RemoveItem,
    AddExercise,
  },
  data() {
    return {
      selectedItem: null,
      selectedExercise: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
    };
  },
  computed: {
    // data request sent to show some result when page first loads
    exercises() {
      return this.$store.state.exercisesModule.exerciseSearch;
    },
  },
  methods: {
    //to open the edit dialog
    openEditDialog(exercise) {
      this.selectedExercise = exercise;
      this.dialogOpen = true;
    },
    // to close edit dialog
    closeEditDialog() {
      this.dialogOpen = false;
    },
    // to open delete dialog
    openRemoveDialog(exercise) {
      this.selectedExercise = exercise;
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

      this.fetchExercisesWithFilters(this.selectedItem);
    },
  },
  async mounted() {
    //fetch data only once page loads
    if (this.exercises.length === 0) {
      await this.$store.dispatch("searchExercise", name);
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
