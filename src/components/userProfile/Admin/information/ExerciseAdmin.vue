<template>
  <div>
    <ProductSearch @search="handleSearch" />
    <ExerciseActions :exercises="exercises" @edit-exercise="openEditDialog" />
    <ExerciseDialog
      :exerciseData="selectedExercise"
      :dialogOpen="dialogOpen"
      @close-dialog="closeEditDialog"
    />
  </div>
</template>

<script>
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
import ExerciseActions from "./actions/ExerciseActions.vue";
import ExerciseDialog from "./actions/ExerciseDialog.vue";
export default {
  components: {
    ProductSearch,
    ExerciseActions,
    ExerciseDialog,
  },
  data() {
    return {
      selectedItem: null,
      exercise: [], // Your array of exercises
      selectedExercise: null,
      dialogOpen: false,
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
    handleSearch(searchItem) {
      console.log(searchItem);
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
