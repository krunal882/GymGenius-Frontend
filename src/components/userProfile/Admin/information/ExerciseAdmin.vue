<template>
  <div>
    <ProductSearch @search="handleSearch" />
    <ExerciseActions
      :exercises="exercises"
      @edit-exercise="openEditDialog"
      @remove-exercise="openRemoveDialog"
    />
    <ExerciseDialog
      :exerciseData="selectedExercise"
      :dialogOpen="dialogOpen"
      @close-dialog="closeEditDialog"
    />
    <RemoveItem
      :action="removeExercise"
      :item="selectedExercise"
      :dialogOpen="removeDialogOpen"
      @close-dialog="closeRemoveDialog"
    />
  </div>
</template>

<script>
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
import ExerciseActions from "./actions/ExerciseActions.vue";
import ExerciseDialog from "./actions/ExerciseDialog.vue";
import RemoveItem from "./actions/removeItem/RemoveItem.vue";
export default {
  components: {
    ProductSearch,
    ExerciseActions,
    ExerciseDialog,
    RemoveItem,
  },
  data() {
    return {
      selectedItem: null,
      exercise: [], // Your array of exercises
      selectedExercise: null,
      dialogOpen: false,
      removeDialogOpen: false,
    };
  },
  computed: {
    exercises() {
      return this.$store.state.exercisesModule.exercises;
    },
  },
  methods: {
    openEditDialog(exercise) {
      this.selectedExercise = exercise;
      this.dialogOpen = true;
    },
    closeEditDialog() {
      this.dialogOpen = false;
    },
    openRemoveDialog(exercise) {
      this.selectedExercise = exercise;
      this.removeDialogOpen = true;
    },
    closeRemoveDialog() {
      this.removeDialogOpen = false;
    },
    handleSearch(searchItem) {
      this.selectedItem = searchItem;

      this.fetchExercisesWithFilters({ name: this.selectedItem });
    },
    async fetchExercisesWithFilters(filteredFilters) {
      try {
        await this.$store.dispatch("fetchExercises", filteredFilters);
      } catch (error) {
        console.error("Error fetching exercises with filters:", error);
      }
    },
  },
};
</script>

<style></style>
