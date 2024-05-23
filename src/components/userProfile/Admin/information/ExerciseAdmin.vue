<template>
  <div>
    <ItemSearch @search="handleSearch" @add="openAddDialog" />
    <AddExercise :dialogOpen="addDialogOpen" @close-dialog="closeAddDialog" />
    <div v-if="exercises.length > 0">
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
        action="removeExercise"
        :item="selectedExercise"
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
      exercise: [],
      selectedExercise: null,
      dialogOpen: false,
      removeDialogOpen: false,
      addDialogOpen: false,
    };
  },
  computed: {
    exercises() {
      return this.$store.state.exercisesModule.exerciseSearch;
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
    openAddDialog() {
      this.addDialogOpen = true;
    },
    closeAddDialog() {
      this.addDialogOpen = false;
    },
    handleSearch(searchItem) {
      this.selectedItem = searchItem;

      this.fetchExercisesWithFilters(this.selectedItem);
    },
    async fetchExercisesWithFilters(name) {
      try {
        await this.$store.dispatch("searchExercise", name);
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
